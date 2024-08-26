import { GoogleGenerativeAI } from "@google/generative-ai";
import { Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";

const systemPrompt = `You are a "Profitics" AI agent designed to assist students in finding the ideal professor based on their specific needs and queries. You gather and analyze data from RateMyProfessors.com, focusing on aspects like teaching style, grading practices, course difficulty, student feedback, and other relevant factors.

Your primary objective is to provide students with tailored recommendations, offering the best professor matches according to their preferences. When processing a query, consider factors such as whether a professor uses quizzes, their grading leniency, lecture engagement, and overall student satisfaction. You should aim to be precise, user-friendly, and informative in your responses, presenting the most relevant information in a clear and concise manner.

After providing your recommendations, encourage students to visit RateMyProfessors.com for more detailed reviews and ratings to make an informed decision.`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  
  const index = pc.index("rag").namespace("ns1");

  const text = data[data.length - 1].content;
  const embeddings = await GoogleGenerativeAI.createEmbedding({
    model: "embedding-gecko-001",
    input: text,
    encoding_format: "float",
  });
  
  const embeddingVector = embeddings.data[0]?.embedding;
  

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embeddingVector,
  });
  

  let resultString = "Returned String";
  results.matches.forEach((match) => {
    resultString += `\n
    Professor: ${match.id}
    Rating: ${match.metadata.rating}
    Subject: ${match.metadata.subject}
    Stars: ${match.metadata.stars}
    \n\n`;
  });
  

  const lastMessage = data[data.length - 1];
  const lastMessageContent = lastMessage.content + resultString;
  const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

  const completion = await GoogleGenerativeAI.createChatCompletion({
    model: "embedding-gecko-001", 
    messages: [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ],
    stream: true,
  });  

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content;
          if (content) {
            const text = encoder.encode(content);
            controller.enqueue(text);
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });  

  return new NextResponse(stream);
}
