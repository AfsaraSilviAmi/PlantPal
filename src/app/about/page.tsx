"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@heroui/react";



export default function AboutPage() {
  return (
    <main className="bg-[#F9F6EE]">

      {/* ================= HERO ================= */}

      <section className="relative overflow-hidden py-24 lg:py-32">

        <div className="absolute -top-20 left-0 w-72 h-72 rounded-full bg-green-200 blur-3xl opacity-40" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-green-100 blur-3xl opacity-50" />

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
          >
            <span className="text-primary-green font-semibold uppercase tracking-wider">
              About PlantPal
            </span>

            <h1 className="text-4xl md:text-6xl font-black text-primary-dark mt-4 leading-tight">
              Helping Every Plant
              <br />
              Thrive.
            </h1>

            <p className="mt-7 text-lg leading-8 text-gray-600">
              PlantPal is a modern platform created for plant lovers who
              want to discover new plants, learn proper care techniques,
              organize their own collection, and receive AI-powered
              gardening assistance—all in one place.
            </p>

            <div className="mt-10">
              <Link href="/plants">
                <Button
                  
                  className="bg-primary-green text-white px-8 rounded-full"
                >
                  Explore Plants
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: .9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: .8 }}
            className="relative h-[450px]"
          >
            <Image
              src="/about-hero.png"
              alt="PlantPal"
              fill
              className="object-contain"
            />
          </motion.div>

        </div>

      </section>

      {/* ================= STORY ================= */}

      <section className="py-24 bg-white overflow-hidden">

        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Image
              src="/our-story.jpg"
              alt="Plant Care"
              width={700}
              height={700}
              className="rounded-3xl shadow-xl"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-primary-dark mb-8">
              Our Story
            </h2>

            <p className="text-gray-600 leading-8 mb-6">
              Caring for plants should be relaxing—not confusing.
            </p>

            <p className="text-gray-600 leading-8 mb-6">
              Many people struggle to identify plants, remember watering
              schedules, or understand proper sunlight and soil
              requirements. PlantPal was built to simplify that journey by
              bringing plant discovery, care information, personal plant
              management, and AI assistance into one easy-to-use platform.
            </p>

            <p className="text-gray-600 leading-8">
              Whether you're growing your very first plant or expanding
              your indoor jungle, PlantPal is here to help every step of
              the way.
            </p>

          </motion.div>

        </div>

      </section>

      {/* ================= VISION ================= */}

      <section className="py-24 bg-primary-green text-white">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center px-6"
        >

          <h2 className="text-4xl md:text-5xl font-black mb-8">
            Our Vision
          </h2>

          <p className="text-xl leading-9 opacity-95 mb-10">
            We believe every home deserves a little more greenery.
            PlantPal aims to build a welcoming platform where people can
            learn, share knowledge, and grow healthier plants together
            through technology and community.
          </p>

          <Link href="/plants">
            <Button
              radius="full"
              className="bg-white text-primary-green font-bold px-10"
            >
              Start Exploring
            </Button>
          </Link>

        </motion.div>

      </section>

    </main>
  );
}