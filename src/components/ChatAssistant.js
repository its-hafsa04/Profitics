"use client";

import { useState } from "react";

export default function ChatAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessages([...messages, { text: input, type: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setMessages([
        ...messages,
        { text: input, type: "user" },
        { text: data.reply, type: "bot" },
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
    <div className="flex flex-col w-[900px] p-5 bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="flex-1 p-4 overflow-y-auto space-y-4 ">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              msg.type === "user"
                ? "bg-blue-100 text-blue-800 self-end"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="p-2 rounded-lg bg-gray-200 text-gray-600 animate-pulse">
            Thinking...
          </div>
        )}
      </div>
      <div className="p-4 border-t text-gray-800 border-gray-200">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}