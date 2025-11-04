import React, { useState } from "react";
import { Send } from "lucide-react";

export default function ChatInput({ onSend, disabled }) {
  const [value, setValue] = useState("");

  const handleSend = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex items-center gap-2 p-4 border-t bg-white">
      <textarea
        className="flex-1 resize-none rounded-lg border p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        rows={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Send a message..."
      />
      <button
        onClick={handleSend}
        disabled={disabled}
        className="p-2 rounded-lg bg-blue-600 text-white disabled:bg-gray-400"
      >
        <Send size={18} />
      </button>
    </div>
  );
}
