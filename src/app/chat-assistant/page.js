"use client";

import { Send } from "@mui/icons-material";
import { useState } from "react";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import PersonIcon from "@mui/icons-material/Person";
import { UserButton } from "@clerk/nextjs";
import ReactMarkdown from "react-markdown";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm Profitics assistant. How can I help you today?",
    },
  ]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: input, type: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify([{ role: "user", content: input }]),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let botReply = "";

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        botReply += chunkValue;
      }

      setMessages([
        ...messages,
        { text: input, type: "user" },
        { text: botReply.trim(), type: "bot" },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([
        ...messages,
        { text: input, type: "user" },
        { text: "Something went wrong, please try again.", type: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex justify-between items-center p-5 bg-black shadow-md">
        <h1 className="text-3xl font-bold">
          <a href="/">
            <TipsAndUpdatesIcon /> Profitics
          </a>
        </h1>
        <nav>
          <a href="/" className=" mr-6 font-medium">
            Home
          </a>
          <UserButton />
        </nav>
      </header>
      <hr className="bg-slate-100" />
      <main
        className="flex-grow flex items-center justify-center p-5"
        style={{
          backgroundImage:
            "url('https://img.pikbest.com/backgrounds/20190716/gif-dark-blue-lines-technology-sense-glowing-background-image-psd_2835555.jpg!bw700')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="flex flex-col items-center justify-center p-5 bg-slate-700 shadow-lg rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
          <div className="flex-1 p-4 overflow-y-hidden space-y-4 ">
            <div className="flex items-start justify-start">
              <TipsAndUpdatesIcon className="mr-2 text-gray-500" />
              <div className="p-2 rounded-lg bg-gray-200 text-gray-600 animate-pulse">
                Hi! I&apos;m Profitics a ChatAssistant. How can I help you?
              </div>
            </div>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-start ${
                  msg.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.type === "user" ? (
                  <PersonIcon className="mr-2 text-slate-500" />
                ) : (
                  <TipsAndUpdatesIcon className="mr-2 text-gray-500" />
                )}
                <div
                  className={`p-2 rounded-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg ${
                    msg.type === "user"
                      ? "bg-blue-100 text-slate-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex items-start justify-start">
                <TipsAndUpdatesIcon className="mr-2 text-gray-500" />
                <div className="p-2 rounded-lg bg-gray-200 text-gray-600 animate-pulse">
                  Thinking...
                </div>
              </div>
            )}
          </div>
          <div className="p-4 border-t text-gray-800 border-gray-200 w-full">
            <form onSubmit={handleSubmit} className="flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
              <button
                type="submit"
                className="ml-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2"
              >
                <Send />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
