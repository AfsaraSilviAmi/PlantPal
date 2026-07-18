"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { PlantCard } from "@/components/plants/plant-card";
import { PlantSkeleton } from "@/components/plants/plant-skeleton";
import { PlantToolbar } from "@/components/plants/plant-toolbar";
import { Plant } from "@/types";
import { Button, Pagination } from "@heroui/react";
import Link from "next/link";
import { FaLeaf } from "react-icons/fa";

const fetchPlants = async (): Promise<Plant[]> => {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || "";
  const response = await fetch(`${baseUrl}/api/plants`);
  if (!response.ok) {
    throw new Error("Failed to fetch plants");
  }
  const data = await response.json();
  // Assume API returns an array directly, or adapt if it returns { data: Plant[] }
  return Array.isArray(data) ? data : data.data || [];
};

export default function PlantsPage() {
  const { data: plants, isLoading, isError } = useQuery<Plant[]>({
    queryKey: ["plants"],
    queryFn: fetchPlants,
  });

  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [difficulty, setDifficulty] = useState("All Difficulties");
  const [sortBy, setSortBy] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 8;

  const filteredAndSortedPlants = useMemo(() => {
    if (!plants) return [];
    
    let result = [...plants];

    // 1. Search (case-insensitive title or scientificName)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          (p.scientificName && p.scientificName.toLowerCase().includes(q))
      );
    }

    // 2. Category
    if (category && category !== "All Categories") {
      result = result.filter((p) => p.category === category);
    }

    // 3. Difficulty
    if (difficulty && difficulty !== "All Difficulties") {
      result = result.filter((p) => p.difficulty === difficulty);
    }

    // 4. Sorting
    if (sortBy) {
      result.sort((a, b) => {
        if (sortBy === "Newest") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortBy === "Oldest") {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortBy === "Price: Low to High") {
          const priceA = a.price ?? 0;
          const priceB = b.price ?? 0;
          return priceA - priceB;
        }
        if (sortBy === "Price: High to Low") {
          const priceA = a.price ?? 0;
          const priceB = b.price ?? 0;
          return priceB - priceA;
        }
        if (sortBy === "Name: A-Z") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });
    }

    return result;
  }, [plants, searchQuery, category, difficulty, sortBy]);
const totalPages = Math.ceil(
  filteredAndSortedPlants.length / plantsPerPage
);

const startIndex = (currentPage - 1) * plantsPerPage;

const currentPlants = filteredAndSortedPlants.slice(
  startIndex,
  startIndex + plantsPerPage
);
  const clearFilters = () => {
    setSearchQuery("");
    setCategory("All Categories");
    setDifficulty("All Difficulties");
    setSortBy("");
  };
useEffect(() => {
  setCurrentPage(1);
}, [searchQuery, category, difficulty, sortBy]);
  return (
    <div className="min-h-screen bg-background-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header Section */}
        <div className="mb-10 text-center sm:text-left">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-dark mb-4 tracking-tight">
            All Plants
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Discover and explore plants shared by the PlantPal community. From resilient succulents to vibrant flowering species, find your next green companion here.
          </p>
        </div>

        {/* Toolbar Section */}
        <div className="mb-8">
          <PlantToolbar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            category={category}
            setCategory={setCategory}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
{filteredAndSortedPlants.length > 0 && (
  <div className="mb-6">
    <p className="text-sm text-gray-600">
      Showing{" "}
      <span className="font-semibold">
        {startIndex + 1}
      </span>
      {" - "}
      <span className="font-semibold">
        {Math.min(
          startIndex + plantsPerPage,
          filteredAndSortedPlants.length
        )}
      </span>
      {" "}of{" "}
      <span className="font-semibold">
        {filteredAndSortedPlants.length}
      </span>
      {" "}plants
    </p>
  </div>
)}
        {/* Grid Section */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <PlantSkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-bold text-red-500 mb-2">Oops! Something went wrong.</h3>
            <p className="text-gray-500">Failed to load the plants. Please try refreshing the page.</p>
          </div>
        ) : plants && plants.length === 0 ? (
          /* Empty State Section - No plants in DB */
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-primary-green/10 rounded-full flex items-center justify-center mb-6">
              <FaLeaf className="text-4xl text-primary-green" />
            </div>
            <h2 className="text-2xl font-bold text-primary-dark mb-3">No plants found</h2>
            <p className="text-gray-500 max-w-md mb-8">
              It looks like our greenhouse is currently empty. Be the first to contribute to the PlantPal community by sharing a plant you love!
            </p>
            <Button
              as={Link}
              href="/plants/add"
              className="bg-primary-green text-white font-bold shadow-lg shadow-primary-green/20 hover:shadow-primary-green/30 text-md px-8"
              size="lg"
              radius="full"
            >
              Add a Plant
            </Button>
          </div>
        ) : filteredAndSortedPlants.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {currentPlants.map((plant, index) => (
              <div key={plant._id} className="h-full">
                <PlantCard plant={plant} index={index} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Section - Filters produce zero results */
          <div className="flex flex-col items-center justify-center py-24 px-4 bg-white rounded-3xl shadow-sm border border-gray-100 text-center">
            <div className="w-24 h-24 bg-primary-green/10 rounded-full flex items-center justify-center mb-6">
              <FaLeaf className="text-4xl text-primary-green" />
            </div>
            <h2 className="text-2xl font-bold text-primary-dark mb-3">No matching plants found</h2>
            <p className="text-gray-500 max-w-md mb-8">
              Try changing your search or filter options.
            </p>
            <Button
              onPress={clearFilters}
              className="bg-primary-green text-white font-bold shadow-lg shadow-primary-green/20 hover:shadow-primary-green/30 text-md px-8"
              size="lg"
              radius="full"
            >
              Clear Filters
            </Button>
          </div>
        )}
<div className="mt-8 flex flex-col items-center gap-3">
  <div className="my-8 flex justify-center">
  <Pagination>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous
          isDisabled={currentPage === 1}
          onPress={() => setCurrentPage((p) => p - 1)}
        >
          <Pagination.PreviousIcon />
          <span>Previous</span>
        </Pagination.Previous>
      </Pagination.Item>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Pagination.Item key={page}>
          <Pagination.Link
            isActive={page === currentPage}
            onPress={() => setCurrentPage(page)}
          >
            {page}
          </Pagination.Link>
        </Pagination.Item>
      ))}

      <Pagination.Item>
        <Pagination.Next
          isDisabled={currentPage === totalPages}
          onPress={() => setCurrentPage((p) => p + 1)}
        >
          <span>Next</span>
          <Pagination.NextIcon />
        </Pagination.Next>
      </Pagination.Item>
    </Pagination.Content>
  </Pagination>
</div>
</div>
      </div>
    </div>
  );
}
