"use client";

import React from "react";
import { Skeleton } from "@heroui/react";

export function PlantSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-full w-full">
      <Skeleton className="w-full h-48 sm:h-56 rounded-none" />
      
      <div className="flex flex-col flex-grow p-5 gap-3">
        <div className="flex justify-between items-start mb-1 gap-2">
          <Skeleton className="w-2/3 h-6 rounded-lg" />
          <Skeleton className="w-1/4 h-6 rounded-lg" />
        </div>
        
        <Skeleton className="w-1/2 h-4 rounded-lg mb-2" />
        
        <div className="flex flex-col gap-2 mt-2">
          <Skeleton className="w-full h-3 rounded-lg" />
          <Skeleton className="w-4/5 h-3 rounded-lg" />
        </div>

        <Skeleton className="w-full h-10 rounded-md mt-auto pt-4" />
      </div>
    </div>
  );
}
