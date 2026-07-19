"use client";

import { motion } from "framer-motion";
import {
  FaTint,
  FaSun,
  FaLeaf,
  FaSeedling,
} from "react-icons/fa";

const tips = [
  {
    icon: <FaTint />,
    title: "Water Smart",
    description:
      "Water only when the top inch of soil feels dry. Overwatering is the #1 reason houseplants die.",
    color: "bg-sky-100 text-sky-600",
  },
  {
    icon: <FaSun />,
    title: "Give Enough Light",
    description:
      "Place plants where they receive the right amount of sunlight based on their species.",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    icon: <FaLeaf />,
    title: "Healthy Leaves",
    description:
      "Remove yellow or damaged leaves regularly to encourage healthier new growth.",
    color: "bg-green-100 text-green-600",
  },
  {
    icon: <FaSeedling />,
    title: "Feed Monthly",
    description:
      "Use a balanced fertilizer once every month during the growing season.",
    color: "bg-emerald-100 text-emerald-600",
  },
];

export default function PlantCareTips() {
  return (
    <section className="py-24 bg-background-cream">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary-green font-semibold">
            Plant Care Tips
          </p>

          <h2 className="text-4xl font-bold text-primary-dark mt-3">
            Keep Your Plants Happy & Healthy
          </h2>

          <p className="text-gray-600 mt-5 max-w-2xl mx-auto">
            Small habits make a huge difference. Follow these simple tips
            to help your plants thrive all year round.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {tips.map((tip, index) => (

            <motion.div
              key={tip.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="bg-white rounded-3xl p-8 shadow-md hover:shadow-xl transition-all"
            >

              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 ${tip.color}`}
              >
                {tip.icon}
              </div>

              <h3 className="text-xl font-bold text-primary-dark mb-4">
                {tip.title}
              </h3>

              <p className="text-gray-600 leading-7">
                {tip.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}