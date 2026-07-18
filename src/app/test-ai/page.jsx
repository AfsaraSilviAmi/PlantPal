"use client";

import { useState } from "react";

export default function TestAIPage() {
  const [reply, setReply] = useState("");

  const askAI = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/chat`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Recommend an easy indoor plant.",
        }),
      }
    );

    const data = await res.json();

    console.log(data);

    setReply(data.reply);
  };

  return (
    <div className="p-10">
      <button
        onClick={askAI}
        className="bg-green-600 text-white px-5 py-3 rounded"
      >
        Ask AI
      </button>

      <p className="mt-6 whitespace-pre-wrap">{reply}</p>
    </div>
  );
}