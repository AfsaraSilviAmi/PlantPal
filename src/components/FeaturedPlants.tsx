"use client";

import { Plant } from "@/types";
import { PlantCard } from "@/components/plants/plant-card";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";

const fetchFeaturedPlants = async (): Promise<Plant[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";

  const res = await fetch(`${baseUrl}/api/featured-plants`);

  if (!res.ok) {
    throw new Error("Failed to fetch featured plants");
  }

  return res.json();
};

export default function FeaturedPlants() {
  const { data: plants, isLoading } = useQuery({
    queryKey: ["featured-plants"],
    queryFn: fetchFeaturedPlants,
  });

  if (isLoading) {
    return (
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center">
            Featured Plants
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-background-cream">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: .7 }}
          className="text-center mb-14"
        >

          <span className="text-primary-green font-semibold uppercase tracking-widest">
            Featured Collection
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-primary-dark mt-3">
            Top Rated Plants
          </h2>

          <p className="mt-5 text-gray-600 max-w-2xl mx-auto">
            Explore the highest-rated plants loved by our PlantPal community.
            Whether you're a beginner or an experienced plant parent,
            these are worth checking out.
          </p>

        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">

          {plants?.map((plant, index) => (

            <motion.div
              key={plant._id}
              initial={{
                opacity: 0,
                y: 70,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
                amount: 0.2,
              }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
              }}
            >

              <PlantCard
                plant={plant}
                index={index}
              />

            </motion.div>

          ))}

        </div>

        {/* Button */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay: .3,
          }}
          className="mt-16 flex justify-center"
        >

        </motion.div>

      </div>

    </section>
  );
}