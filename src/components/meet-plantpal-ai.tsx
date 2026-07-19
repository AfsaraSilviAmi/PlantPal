"use client";

import { motion } from "framer-motion";
import { Button } from "@heroui/react";
import {
  FaCheckCircle,
  FaLeaf,
  FaRobot,
  FaUserCircle,
} from "react-icons/fa";

const features = [
  "Instant plant care advice",
  "Identify common plant problems",
  "Beginner-friendly guidance",
  "Personalized recommendations",
  "Conversation memory",
];

export default function MeetPlantPalAI() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
        >
          <span className="text-primary-green font-bold uppercase tracking-[0.3em]">
            AI Assistant
          </span>

          <h2 className="text-4xl lg:text-5xl font-black text-primary-dark mt-4 leading-tight">
            Meet
            <span className="text-primary-green"> PlantPal AI</span>
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            PlantPal AI is your personal gardening companion. Ask questions in
            natural language, receive expert care advice, identify common
            problems, and enjoy intelligent conversations designed to help your
            plants thrive.
          </p>

          <div className="mt-10 space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: .5,
                }}
                viewport={{ once: true }}
                className="flex items-center gap-4"
              >
                <FaCheckCircle className="text-primary-green text-xl flex-shrink-0" />

                <span className="text-gray-700 text-lg">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>

        </motion.div>

        {/* RIGHT */}

        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .7 }}
          viewport={{ once: true }}
          className="relative"
        >

          {/* floating icon */}

          <motion.div
            animate={{
              y: [0, -12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
            }}
            className="absolute -top-10 right-6 bg-primary-green text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl z-20"
          >
            <FaRobot size={28} />
          </motion.div>

          <div className="bg-green-50 rounded-3xl p-8 shadow-xl border border-green-100 space-y-5">

            {/* User */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .2 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="flex items-end gap-3 max-w-sm">

                <div className="bg-primary-green text-white rounded-2xl px-5 py-4">
                  Why are my Monstera leaves turning yellow?
                </div>

                <FaUserCircle
                  className="text-primary-green"
                  size={35}
                />

              </div>
            </motion.div>

            {/* AI */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .4 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div className="flex items-start gap-3 max-w-sm">

                <div className="bg-primary-green text-white rounded-full p-3">
                  <FaLeaf />
                </div>

                <div className="bg-white rounded-2xl px-5 py-4 shadow">

                  Yellow leaves often indicate
                  <span className="font-bold">
                    {" "}overwatering
                  </span>.
                  Allow the soil to dry slightly before watering again
                  and ensure your pot has proper drainage.

                </div>

              </div>
            </motion.div>

            {/* User */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .6 }}
              viewport={{ once: true }}
              className="flex justify-end"
            >
              <div className="flex items-end gap-3 max-w-sm">

                <div className="bg-primary-green text-white rounded-2xl px-5 py-4">
                  How often should I water it?
                </div>

                <FaUserCircle
                  className="text-primary-green"
                  size={35}
                />

              </div>
            </motion.div>

            {/* AI */}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: .8 }}
              viewport={{ once: true }}
              className="flex"
            >
              <div className="flex items-start gap-3 max-w-sm">

                <div className="bg-primary-green text-white rounded-full p-3">
                  <FaLeaf />
                </div>

                <div className="bg-white rounded-2xl px-5 py-4 shadow">

                  Most Monsteras need watering
                  <span className="font-bold">
                    {" "}every 7–10 days
                  </span>,
                  but always check if the top inch of soil feels dry first.

                </div>

              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}