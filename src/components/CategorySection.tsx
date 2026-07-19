"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  FaHome,
  FaTree,
  FaSeedling,
  FaSpa,
  FaLeaf,
  FaCarrot,
} from "react-icons/fa";

const categories = [
  {
    title: "Indoor",
    icon: FaHome,
    color: "bg-green-100",
    href: "/plants?category=Indoor",
  },
  {
    title: "Outdoor",
    icon: FaTree,
    color: "bg-emerald-100",
    href: "/plants?category=Outdoor",
  },
  {
    title: "Succulent",
    icon: FaSeedling,
    color: "bg-lime-100",
    href: "/plants?category=Succulent",
  },
  {
    title: "Flowering",
    icon: FaSpa,
    color: "bg-pink-100",
    href: "/plants?category=Flowering",
  },
  {
    title: "Herb",
    icon: FaLeaf,
    color: "bg-teal-100",
    href: "/plants?category=Herb",
  },
  {
    title: "Vegetable",
    icon: FaCarrot,
    color: "bg-orange-100",
    href: "/plants?category=Vegetable",
  },
];

export default function CategoriesSection() {
  return (
    <section className="py-24 bg-[#F9F6EE]">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .6 }}
          className="text-center mb-16"
        >
          <p className="text-primary-green font-semibold">
            Browse by Category
          </p>

          <h2 className="text-4xl font-bold text-primary-dark mt-3">
            Find Plants You'll Love
          </h2>

          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore different types of plants and discover the perfect
            addition to your indoor or outdoor garden.
          </p>
        </motion.div>

        {/* Categories */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * .1,
                  duration: .5,
                }}
              >
                <Link href={category.href}>
                  <div
                    className="
                    group
                    bg-white
                    rounded-3xl
                    p-8
                    text-center
                    shadow-md
                    hover:shadow-2xl
                    transition-all
                    duration-300
                    hover:-translate-y-2
                    cursor-pointer
                    h-full
                    "
                  >

                    <div
                      className={`
                      ${category.color}
                      w-20
                      h-20
                      rounded-full
                      flex
                      items-center
                      justify-center
                      mx-auto
                      mb-6
                      transition-all
                      duration-300
                      group-hover:scale-110
                      `}
                    >
                      <Icon className="text-4xl text-primary-green" />
                    </div>

                    <h3 className="text-2xl font-bold text-primary-dark">
                      {category.title}
                    </h3>

                    <p className="mt-3 text-gray-600">
                      Explore {category.title.toLowerCase()} plants for your
                      collection.
                    </p>

                  </div>
                </Link>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}