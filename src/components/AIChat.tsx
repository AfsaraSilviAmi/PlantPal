"use client";

import { useState } from "react";

export default function AIChat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full bg-primary-green text-white shadow-xl text-3xl z-50"
      >
        🌿
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 w-[360px] h-[500px] max-h-[75vh] rounded-3xl bg-white shadow-2xl border z-50 flex flex-col">

          <div className="border-b p-5 font-bold text-xl">
            🌿 PlantPal AI
          </div>

          <div className="p-5">
            Hello!
          </div>

        </div>
      )}
    </>
  );
}