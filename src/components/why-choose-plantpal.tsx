"use client";

import { motion } from "framer-motion";
import {
  FaRobot,
  FaLeaf,
  FaUsers,
  FaSeedling,
} from "react-icons/fa";

const features = [
  {
    icon: <FaRobot size={40} />,
    title: "AI Plant Assistant",
    description:
      "Get instant answers to your plant care questions. PlantPal AI helps diagnose issues, recommends care tips, and guides you every step of the way.",
  },
  {
    icon: <FaLeaf size={40} />,
    title: "Extensive Plant Library",
    description:
      "Explore a growing collection of indoor plants, vegetables, herbs, and flowering plants complete with detailed care instructions.",
  },
  {
    icon: <FaSeedling size={40} />,
    title: "Beginner Friendly",
    description:
      "Whether you're buying your first plant or building a jungle, PlantPal provides simple care guides and difficulty ratings.",
  },
  {
    icon: <FaUsers size={40} />,
    title: "Community Driven",
    description:
      "Share your own plants, discover community favorites, and learn from fellow plant lovers around the world.",
  },
];

const stats = [
  {
    value: "20+",
    label: "Plants",
  },
  {
    value: "24/7",
    label: "AI Assistant",
  },
  {
    value: "100%",
    label: "Beginner Friendly",
  },
  {
    value: "Growing",
    label: "Community",
  },
];

export default function WhyChoosePlantPal() {
  return (
    <section className="py-24 bg-green-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <p className="uppercase tracking-[0.3em] text-primary-green font-bold">
            Why PlantPal
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-primary-dark mt-3">
            Everything You Need To
            <br />
            Grow Happier Plants 🌿
          </h2>

          <p className="mt-6 max-w-3xl mx-auto text-gray-600 text-lg">
            PlantPal combines artificial intelligence, expert plant care,
            and a passionate community into one simple platform designed
            for every plant lover.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {features.map((feature, index) => (

            <motion.div
              key={feature.title}
              initial={{
                opacity: 0,
                y: 60,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: .5,
                delay: index * .15,
              }}
              viewport={{ once: true }}
              whileHover={{
                y: -10,
              }}
              className="group bg-white rounded-3xl p-8 shadow-md hover:shadow-2xl transition-all duration-300 border border-green-100"
            >

              <div className="w-16 h-16 rounded-2xl bg-primary-green/10 flex items-center justify-center text-primary-green group-hover:scale-110 transition-transform duration-300">

                {feature.icon}

              </div>

              <h3 className="mt-6 text-2xl font-bold text-primary-dark">

                {feature.title}

              </h3>

              <p className="mt-4 text-gray-600 leading-7">

                {feature.description}

              </p>

            </motion.div>

          ))}

        </div>

        {/* Stats */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: .7,
          }}
          viewport={{ once: true }}
          className="mt-24"
        >

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 bg-primary-dark rounded-3xl p-10">

            {stats.map((item) => (

              <div
                key={item.label}
                className="text-center"
              >

                <h3 className="text-4xl font-black text-white">

                  {item.value}

                </h3>

                <p className="mt-2 text-green-200">

                  {item.label}

                </p>

              </div>

            ))}

          </div>

        </motion.div>

      </div>

    </section>
  );
}