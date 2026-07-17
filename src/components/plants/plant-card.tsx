"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Chip } from "@heroui/react";
import { Plant } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

interface PlantCardProps {
  plant: Plant;
  index: number;
}

export function PlantCard({ plant, index }: PlantCardProps) {
  // Beautiful placeholder if image is missing
  const imageUrl = plant.image && plant.image.trim() !== ""
    ? plant.image
    : "https://images.unsplash.com/photo-1416879598555-2272af5d7870?q=80&w=600&auto=format&fit=crop";

  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "danger";
      default:
        return "default";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 h-full"
    >
      <div className="relative w-full h-48 sm:h-56 overflow-hidden bg-gray-100 flex-shrink-0">
        {/* We use standard img for simplicity with external URLs without configuring next/image domains, but ideally next/image is better if configured. Let's use a standard img tag with object-cover */}
        <img
          src={imageUrl}
          alt={plant.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1416879598555-2272af5d7870?q=80&w=600&auto=format&fit=crop";
          }}
        />
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
          <Chip
            size="sm"
            color={getDifficultyColor(plant.difficulty)}
            className="shadow-sm font-medium backdrop-blur-md bg-opacity-90"
          >
            {plant.difficulty}
          </Chip>
          <Chip
            size="sm"
            className="bg-white/90 text-primary-dark shadow-sm font-medium backdrop-blur-md"
          >
            <div className="flex items-center gap-1">
              <FaLeaf className="text-primary-green text-xs" />
              <span>{plant.category}</span>
            </div>
          </Chip>
        </div>
      </div>

      <div className="flex flex-col flex-grow p-5">
        <div className="flex justify-between items-start mb-1 gap-2">
          <h3 className="text-xl font-bold text-primary-dark line-clamp-1">{plant.title}</h3>
          {plant.price && (
            <span className="text-lg font-bold text-accent-orange flex-shrink-0">
              ${plant.price}
            </span>
          )}
        </div>

        <p className="text-sm italic text-gray-500 mb-3 line-clamp-1">
          {plant.scientificName}
        </p>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
          {plant.shortDescription}
        </p>

        <Button
          as={Link}
          href={`/plants/${plant._id}`}
          className="w-full mt-auto bg-primary-green/10 text-primary-dark hover:bg-primary-green hover:text-white font-semibold transition-colors border border-primary-green/20 hover:border-transparent"
          radius="md"
        >
          View Details
        </Button>
      </div>
    </motion.div>
  );
}
