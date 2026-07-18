"use client";

import React from "react";
import { Input, Select, ListBox, Label } from "@heroui/react";
import { FaSearch } from "react-icons/fa";

interface PlantToolbarProps {
  searchQuery?: string;
  setSearchQuery?: (val: string) => void;
  category?: string;
  setCategory?: (val: string) => void;
  difficulty?: string;
  setDifficulty?: (val: string) => void;
  sortBy?: string;
  setSortBy?: (val: string) => void;
}

export function PlantToolbar({
  searchQuery = "",
  setSearchQuery = () => { },
  category = "All Categories",
  setCategory = () => { },
  difficulty = "All Difficulties",
  setDifficulty = () => { },
  sortBy = "",
  setSortBy = () => { },
}: PlantToolbarProps) {
  const categories = ["All Categories", "Indoor", "Outdoor", "Succulent", "Flowering", "Herb", "Vegetable"];
  const difficulties = ["All Difficulties", "Easy", "Medium", "Hard"];
  const sortOptions = ["Newest", "Oldest", "Price: Low to High", "Price: High to Low", "Name: A-Z"];

  return (
    <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-end md:items-center">
      <div className="relative w-full">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search plants..."
          className="w-full rounded-xl border border-gray-300 py-3 pl-11 pr-4 focus:border-green-500 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex w-full md:w-auto gap-3 flex-col sm:flex-row">
        <Select
          className="w-full sm:w-40"
          aria-label="Filter by Category"
          selectedKey={category}
          onSelectionChange={(key) => {
            if (key) setCategory(key.toString());
          }}
        >
          <Select.Trigger className="bg-gray-50 border border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors shadow-none h-10">
            <Select.Value />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {categories.map((cat) => (
                <ListBox.Item key={cat} id={cat} textValue={cat}>
                  <Label>{cat}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          className="w-full sm:w-40"
          aria-label="Filter by Difficulty"
          selectedKey={difficulty}
          onSelectionChange={(key) => {
            if (key) setDifficulty(key.toString());
          }}
        >
          <Select.Trigger className="bg-gray-50 border border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors shadow-none h-10">
            <Select.Value />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {difficulties.map((diff) => (
                <ListBox.Item key={diff} id={diff} textValue={diff}>
                  <Label>{diff}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <Select
          className="w-full sm:w-48"
          aria-label="Sort plants"
          selectedKey={sortBy}
          onSelectionChange={(key) => {
            if (key) setSortBy(key.toString());
          }}
        >
          <Select.Trigger className="bg-gray-50 border border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors shadow-none h-10">
            <Select.Value />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {sortOptions.map((opt) => (
                <ListBox.Item key={opt} id={opt} textValue={opt}>
                  <Label>{opt}</Label>
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>
      </div>
    </div>
  );
}
