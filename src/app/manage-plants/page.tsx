"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AlertDialog, Button, Card, Skeleton } from "@heroui/react";
import { Plant } from "@/types";
import { useState } from "react";
import { toast } from "react-toastify";
import { FaEye, FaLeaf, FaTrash } from "react-icons/fa";

export default function ManagePlantsPage() {
  const { data: session, isPending } = useSession();

  const [search, setSearch] = useState("");

  const queryClient = useQueryClient();

  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  const {
    data: plants = [],
    isLoading,
    isError,
  } = useQuery<Plant[]>({
    queryKey: ["my-plants", session?.user?.email],
    enabled: !!session?.user?.email,
    queryFn: async () => {
      const res = await fetch(
        `${baseUrl}/api/my-plants/${session!.user.email}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch plants");
      }

      return await res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${baseUrl}/api/plants/${id}?email=${session?.user.email}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) {
        throw new Error("Delete failed");
      }

      return await res.json();
    },

    onSuccess: () => {
      toast.success("Plant deleted.");
      queryClient.invalidateQueries({
        queryKey: ["my-plants"],
      });
    },

    onError: () => {
      toast.error("Couldn't delete plant.");
    },
  });

 if (isPending || isLoading) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-10">
        <div className="space-y-4">
          <Skeleton className="h-10 w-80 rounded-xl" />
          <Skeleton className="h-5 w-[420px] rounded-xl" />
        </div>

        <Skeleton className="hidden lg:block h-28 w-40 rounded-2xl" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

        {Array.from({ length: 8 }).map((_, index) => (

          <Card
            key={index}
            className="overflow-hidden rounded-2xl shadow-sm border border-gray-100"
          >

            {/* Image */}
            <Skeleton className="w-full h-56 rounded-none" />

            {/* Card Body */}
            <div className="p-5">

              <div className="flex justify-between items-center mb-3">
                <Skeleton className="h-7 w-36 rounded-lg" />
                <Skeleton className="h-6 w-16 rounded-lg" />
              </div>

              <Skeleton className="h-4 w-40 rounded-lg mb-4" />

              <Skeleton className="h-4 w-20 rounded-lg mb-5" />

              <Skeleton className="h-4 w-full rounded-lg mb-2" />
              <Skeleton className="h-4 w-5/6 rounded-lg mb-6" />

              <div className="flex justify-between mb-6">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>

              <div className="flex gap-3">

                <Skeleton className="h-11 flex-1 rounded-full" />

                <Skeleton className="h-11 w-28 rounded-full" />

              </div>

            </div>

          </Card>

        ))}

      </div>

    </div>
  );
}

  if (isError) {
    return (
      <div className="h-[60vh] flex justify-center items-center">
        Failed to load plants.
      </div>
    );
  }

  const filtered = plants.filter((plant) =>
    plant.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto py-10 px-5">

     <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">

  <div>
    <span className="inline-flex items-center gap-2 bg-green-100 text-primary-green px-4 py-2 rounded-full text-sm font-semibold mb-4">
      🌿 Plant Dashboard
    </span>

    <h1 className="text-5xl font-extrabold text-primary-dark tracking-tight">
      Manage Your Plants
    </h1>

    <p className="text-gray-500 mt-3 text-lg max-w-xl">
      View, manage and delete every plant you've shared with PlantPal.
    </p>
  </div>

  <div className="bg-white shadow-sm rounded-2xl px-6 py-5 border border-gray-100">
    <p className="text-gray-500 text-sm">
      Total Plants
    </p>

    <h2 className="text-4xl font-bold text-primary-green">
      {filtered.length}
    </h2>
  </div>

</div>

      {filtered.length === 0 ? (
        <div className="text-center py-20">
          <FaLeaf className="mx-auto text-5xl text-green-500 mb-5" />
          <h2 className="text-2xl font-semibold">
            No plants found
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

          {filtered.map((plant) => (

            <Card
              key={plant._id}
              className="overflow-hidden rounded-2xl"
            >

              <div className="relative w-full h-56 overflow-hidden bg-gray-100">
  <Image
    src={
      plant.image ||
      "https://images.unsplash.com/photo-1416879598555-2272af5d7870?q=80&w=600&auto=format&fit=crop"
    }
    alt={plant.title}
    width={1000}
    height={1000}
    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
  />
</div>

              <div className="flex flex-col flex-grow p-5">

  <div className="flex justify-between items-start mb-1">

    <h3 className="text-xl font-bold text-primary-dark line-clamp-1">
      {plant.title}
    </h3>

    <span className="text-lg font-bold text-accent-orange">
      ${(plant.price ?? 15.99).toFixed(2)}
    </span>

  </div>

  <p className="text-sm italic text-gray-500 mb-3">
    {plant.scientificName}
  </p>

  <div className="flex items-center gap-1 text-yellow-500 mb-3">
    ⭐
    <span className="text-sm font-medium">
      {(plant.rating ?? 4.5).toFixed(1)}/5
    </span>
  </div>

  <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
    {plant.shortDescription}
  </p>

  <div className="flex items-center justify-between mb-4">

    <span className="text-sm font-medium bg-green-50 px-3 py-1 rounded-full">
      {plant.category}
    </span>

    <span className="text-sm font-medium bg-yellow-50 px-3 py-1 rounded-full">
      {plant.difficulty}
    </span>

  </div>

  <div className="flex gap-3 mt-auto">

              <Link href={`/plants/${plant._id}`} className="flex-1">
  <Button
    variant="outline"
    className="w-full bg-primary-green/10 hover:bg-primary-green hover:text-white border border-primary-green/20 rounded-full font-semibold transition-all duration-300"
  >
    <span className="flex items-center justify-center gap-2">
      <FaEye />
      View
    </span>
  </Button>
</Link>

                  <AlertDialog>

  <Button
  variant="outline"
  className="border-red-200 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-full px-4 transition-all duration-300"
>
  <span className="flex items-center gap-2">
    <FaTrash />
    Delete
  </span>
</Button>

  <AlertDialog.Backdrop>

    <AlertDialog.Container>

      <AlertDialog.Dialog className="sm:max-w-[420px] rounded-2xl">

        <AlertDialog.CloseTrigger />

        <AlertDialog.Header>

          <AlertDialog.Icon status="danger" />

          <AlertDialog.Heading>
            Delete Plant?
          </AlertDialog.Heading>

        </AlertDialog.Header>

        <AlertDialog.Body>

          <p>
            Are you sure you want to permanently delete
            <strong> {plant.title}</strong>?
          </p>

          <p className="mt-3 text-sm text-gray-500">
            This action cannot be undone.
          </p>

        </AlertDialog.Body>

        <AlertDialog.Footer>

          <Button
            slot="close"
            variant="flat"
          >
            Cancel
          </Button>

          <Button
            slot="close"
            color="danger"
            isLoading={deleteMutation.isPending}
            onPress={() => deleteMutation.mutate(plant._id)}
          >
            Delete
          </Button>

        </AlertDialog.Footer>

      </AlertDialog.Dialog>

    </AlertDialog.Container>

  </AlertDialog.Backdrop>

</AlertDialog>

                </div>

              </div>

            </Card>

          ))}

        </div>
      )}

    </div>
  );
}