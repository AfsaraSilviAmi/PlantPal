"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <main className="min-h-screen bg-[#F9F6EE] flex items-center justify-center overflow-hidden px-6">

      {/* floating blobs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [.3, .5, .3],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
        }}
        className="absolute w-72 h-72 rounded-full bg-green-200 blur-3xl left-10 top-20"
      />

      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [.4, .2, .4],
        }}
        transition={{
          repeat: Infinity,
          duration: 6,
        }}
        className="absolute w-96 h-96 rounded-full bg-green-100 blur-3xl right-0 bottom-0"
      />

      <div className="text-center relative z-10">

        {/* Plant */}

        <motion.div
          animate={{
            y: [0, -12, 0],
            rotate: [0, 3, -3, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
          }}
          className="text-8xl"
        >
          🌱
        </motion.div>

        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .3 }}
          className="mt-8 text-4xl font-black text-primary-dark"
        >
          Growing your garden...
        </motion.h1>

        <p className="mt-4 text-gray-600 text-lg">
          PlantPal is watering your plants 🌿
        </p>

        {/* Animated dots */}

        <div className="flex justify-center gap-3 mt-10">

          {[0,1,2].map((i)=>(
            <motion.div
              key={i}
              animate={{
                y:[0,-12,0],
                scale:[1,1.3,1]
              }}
              transition={{
                repeat:Infinity,
                delay:i*.2,
                duration:.8
              }}
              className="w-4 h-4 rounded-full bg-primary-green"
            />
          ))}

        </div>

      </div>

    </main>
  );
}