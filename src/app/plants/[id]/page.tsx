"use client";

import React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Plant } from "@/types";
import { PlantCard } from "@/components/plants/plant-card";
import { PlantSkeleton } from "@/components/plants/plant-skeleton";
import Image from "next/image";
import Link from "next/link";
import { Button, Chip, Skeleton } from "@heroui/react";
import { motion } from "framer-motion";
import { FaLeaf, FaArrowLeft, FaPaw, FaHome, FaTree, FaSun, FaTint, FaCalendarAlt, FaStar } from "react-icons/fa";

const fetchPlant = async (id: string): Promise<Plant> => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const response = await fetch(`${baseUrl}/api/plants/${id}`);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Plant not found");
    }
    throw new Error("Failed to fetch plant");
  }
  const data = await response.json();
  return data.data || data;
};

const fetchAllPlants = async (): Promise<Plant[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const response = await fetch(`${baseUrl}/api/plants`);
  if (!response.ok) {
    throw new Error("Failed to fetch related plants");
  }
  const data = await response.json();
  return Array.isArray(data) ? data : data.data || [];
};

export default function PlantDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: plant, isLoading, isError } = useQuery<Plant>({
    queryKey: ["plant", id],
    queryFn: () => fetchPlant(id),
    enabled: !!id,
    retry: false,
  });

  const { data: allPlants, isLoading: isRelatedLoading } = useQuery<Plant[]>({
    queryKey: ["plants"],
    queryFn: fetchAllPlants,
  });

  // Calculate related plants: same category first, exclude current, max 4
  const relatedPlants = React.useMemo(() => {
    if (!allPlants || !plant) return [];
    const others = allPlants.filter((p) => p._id !== plant._id);
    const sameCategory = others.filter((p) => p.category === plant.category);
    const differentCategory = others.filter((p) => p.category !== plant.category);
    return [...sameCategory, ...differentCategory].slice(0, 4);
  }, [allPlants, plant]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background-cream py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-8">
          <div className="flex flex-col md:flex-row gap-8">
            <Skeleton className="w-full md:w-1/2 h-96 rounded-3xl" />
            <div className="w-full md:w-1/2 flex flex-col gap-4">
              <Skeleton className="w-3/4 h-12 rounded-lg" />
              <Skeleton className="w-1/2 h-6 rounded-lg" />
              <div className="flex gap-2">
                <Skeleton className="w-24 h-8 rounded-full" />
                <Skeleton className="w-24 h-8 rounded-full" />
              </div>
              <Skeleton className="w-1/3 h-10 rounded-lg mt-4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !plant) {
    return (
      <div className="min-h-screen bg-background-cream flex flex-col items-center justify-center py-24 px-4">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-6">
          <FaLeaf className="text-4xl text-red-500 opacity-50" />
        </div>
        <h2 className="text-3xl font-bold text-primary-dark mb-4">Plant Not Found</h2>
        <p className="text-gray-500 max-w-md text-center mb-8">
          We couldn't find the plant you were looking for. It might have been removed or the link is incorrect.
        </p>
       <Link href="/plants">
  <Button
    className="bg-primary-green rounded-full text-white font-bold"
    size="lg"
  >
    <FaArrowLeft className="mr-2" />
    Back to All Plants
  </Button>
</Link>
      </div>
    );
  }

  const imageUrl = plant.image && plant.image.trim() !== ""
    ? plant.image
    : "/plant.jpg";

  const getDifficultyClass = (difficulty: string) => {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-700 border border-green-200";

    case "medium":
      return "bg-yellow-100 text-yellow-700 border border-yellow-200";

    case "hard":
      return "bg-red-100 text-red-700 border border-red-200";

    default:
      return "bg-gray-100 text-gray-700 border border-gray-200";
  }
};
const displayPrice = plant.price ?? 15.99;
const displayRating = plant.rating ?? 4.5;
  return (
    <div className="min-h-screen bg-background-cream py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link href="/plants" className="inline-flex items-center text-primary-green hover:text-primary-dark transition-colors font-medium mb-8">
          <FaArrowLeft className="mr-2" />
          Back to Collection
        </Link>

        {/* Top Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row gap-10 mb-12 bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100"
        >
          {/* Image Gallery */}
          <div className="w-full lg:w-1/2">
            <div className="relative w-full aspect-square sm:aspect-auto sm:h-[500px] rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={imageUrl}
                alt={plant.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          {/* Plant Details */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="flex flex-wrap gap-2 mb-4">
             <Chip
  size="sm"
  className="bg-primary-green/10 text-primary-green font-medium border border-primary-green/20"
>
  <div className="flex items-center gap-1">
    <FaLeaf className="text-xs" />
    <span>{plant.category}</span>
  </div>
</Chip>
              <Chip
  size="sm"
  className={`${getDifficultyClass(plant.difficulty)} font-medium`}
>
                {plant.difficulty}
              </Chip>
              {plant.petFriendly && (
               <Chip
  size="sm"
  className="bg-blue-100 text-blue-700 font-medium border border-blue-200"
>
  <div className="flex items-center gap-1">
    <FaPaw className="text-xs" />
    <span>Pet Friendly</span>
  </div>
</Chip>
              )}
              {plant.indoor ? (
                 <Chip
  size="sm"
  className="bg-purple-100 text-purple-700 font-medium border border-purple-200"
>
  <div className="flex items-center gap-1">
    <FaHome className="text-xs" />
    <span>Indoor</span>
  </div>
</Chip>
              ) : (
              <Chip
  size="sm"
  className="bg-orange-100 text-orange-700 font-medium border border-orange-200"
>
  <div className="flex items-center gap-1">
    <FaTree className="text-xs" />
    <span>Outdoor</span>
  </div>
</Chip>
              )}
              <Chip
  size="sm"
  className="bg-yellow-100 text-yellow-700 border border-yellow-200"
>
  <div className="flex items-center gap-1">
    <FaStar className="text-xs" />
    <span>{displayRating.toFixed(1)}/5</span>
  </div>
</Chip>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-dark mb-2">{plant.title}</h1>
            <p className="text-xl text-gray-500 italic mb-6">{plant.scientificName}</p>

<div className="mb-8">
  <span className="text-3xl font-bold text-accent-orange">
    ${displayPrice.toFixed(2)}
  </span>
</div>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {plant.shortDescription}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Left Column: Description & Reviews */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
            >
              <h3 className="text-2xl font-bold text-primary-dark mb-6">About this plant</h3>
              <div className="prose prose-green max-w-none text-gray-600 leading-relaxed">
                <p className="whitespace-pre-line">{plant.description}</p>
              </div>
            </motion.div>

            {/* Reviews Section */}
            <motion.div
  className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
>
  <h3 className="text-2xl font-bold text-primary-dark mb-6">
    Plant Rating
  </h3>

  <div className="flex items-center gap-3 mb-4">
    <FaStar className="text-yellow-500 text-3xl" />
    <span className="text-4xl font-bold">
      {displayRating.toFixed(1)}
    </span>
    <span className="text-gray-500">/ 5</span>
  </div>

  <p className="text-gray-600">
    Community rating provided when this plant was added to the collection.
  </p>
</motion.div>
          </div>

          {/* Right Column: Specifications */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 sticky top-8"
            >
              <h3 className="text-xl font-bold text-primary-dark mb-6">Plant Specifications</h3>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    <FaLeaf className="mr-3 text-primary-green" />
                    <span>Category</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.category}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    <FaStar className="mr-3 text-primary-green" />
                    <span>Difficulty</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.difficulty}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    <FaTint className="mr-3 text-primary-green" />
                    <span>Watering</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.wateringFrequency}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    <FaSun className="mr-3 text-primary-green" />
                    <span>Sunlight</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.sunlight}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    <FaPaw className="mr-3 text-primary-green" />
                    <span>Pet Friendly</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.petFriendly ? "Yes" : "No"}</span>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                  <div className="flex items-center text-gray-500">
                    {plant.indoor ? <FaHome className="mr-3 text-primary-green" /> : <FaTree className="mr-3 text-primary-green" />}
                    <span>Placement</span>
                  </div>
                  <span className="font-medium text-gray-800">{plant.indoor ? "Indoor" : "Outdoor"}</span>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center text-gray-500">
                    <FaCalendarAlt className="mr-3 text-primary-green" />
                    <span>Added</span>
                  </div>
                  <span className="font-medium text-gray-800">
                    {new Date(plant.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Plants */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-extrabold text-primary-dark">You might also like</h2>
            <Link href="/plants" className="text-primary-green font-medium hover:underline hidden sm:block">
              View all plants
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {isRelatedLoading ? (
              Array.from({ length: 4 }).map((_, i) => <PlantSkeleton key={i} />)
            ) : relatedPlants.length > 0 ? (
              relatedPlants.map((p, index) => (
                <div key={p._id} className="h-full">
                  <PlantCard plant={p} index={index} />
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-full">No related plants found.</p>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
