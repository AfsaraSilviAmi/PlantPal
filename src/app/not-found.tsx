"use client";

import Link from "next/link";
import { Button } from "@heroui/react";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] flex items-center justify-center overflow-hidden px-6">

      {/* blobs */}

      <div className="absolute w-80 h-80 rounded-full bg-green-200 blur-3xl opacity-40 top-10 left-10" />
      <div className="absolute w-96 h-96 rounded-full bg-green-100 blur-3xl opacity-50 bottom-0 right-0" />

      <div className="relative z-10 text-center max-w-xl">

        {/* Lost plant */}

        <motion.div
          animate={{
            rotate:[0,8,-8,0],
            y:[0,-10,0]
          }}
          transition={{
            repeat:Infinity,
            duration:3
          }}
          className="text-[120px]"
        >
          🪴
        </motion.div>

        <motion.h1
          initial={{ opacity:0,y:20 }}
          animate={{ opacity:1,y:0 }}
          className="text-7xl font-black text-primary-dark mt-4"
        >
          404
        </motion.h1>

        <h2 className="text-4xl font-bold mt-6 text-primary-dark">
          Oops! This plant doesn't exist.
        </h2>

        <p className="mt-6 text-gray-600 leading-8 text-lg">
          Looks like you've wandered into the wrong garden.
          Let's get you back to where the plants are growing.
        </p>

        <Link href="/">
          <Button
            className="mt-10 bg-primary-green text-white rounded-full px-10 font-semibold"
          >
            🌿 Back Home
          </Button>
        </Link>

      </div>

    </main>
  );
}