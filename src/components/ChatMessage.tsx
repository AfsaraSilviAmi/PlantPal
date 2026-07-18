"use client";

import ReactMarkdown from "react-markdown";
import { ChatMessage as Message } from "@/types/chat";

export default function ChatMessage({
  message,
}: {
  message: Message;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
          isUser
            ? "bg-primary-green text-white"
            : "bg-gray-100"
        }`}
      >
        <ReactMarkdown>
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}