import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { text: input, sender: "user" }]);
    setInput("");

    try {
      // Example backend call
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.reply || "Error: Could not get a reply.", sender: "bot" }]);
    } catch (err) {
      setMessages((prev) => [...prev, { text: "Error: Could not get a reply.", sender: "bot" }]);
    }
  };

  return (
    
    <div className="flex justify-center bg-gray-50 h-screen overflow-hidden">
      <div className="flex flex-col w-full max-w-3xl h-full bg-white shadow-sm border-x">
        {/* Chat area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-lg max-w-[80%] ${
                msg.sender === "user"
                  ? "ml-auto bg-blue-500 text-white"
                  : "mr-auto bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSend}
          className="border-t bg-white p-4 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-full p-2 px-4 hover:bg-blue-600"
          >
            ➤
          </button>
        </form>
      </div>
    </div>
  );
}
