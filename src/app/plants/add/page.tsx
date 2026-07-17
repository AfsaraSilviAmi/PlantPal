"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Form,
  TextField,
  Label,
  Input,
  FieldError,
  Button,
  TextArea,
  Select,
  ListBox,
  RadioGroup,
  Radio,
} from "@heroui/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";

export default function AddPlantPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  if (isPending || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-cream">
        <div className="w-8 h-8 border-4 border-primary-green border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  console.log("Step 1");

  const formData = new FormData(e.currentTarget);

  console.log("Step 2");

  const data = Object.fromEntries(formData.entries());

  console.log("Step 3", data);

  const payload = {
    title: data.title as string,
    scientificName: data.scientificName as string,
    category: data.category as string,
    difficulty: data.difficulty as string,
    wateringFrequency: data.wateringFrequency as string,
    sunlight: data.sunlight as string,
    petFriendly: data.petFriendly === "yes",
    indoor: data.indoor === "yes",
    image: data.image as string,
    shortDescription: data.shortDescription as string,
    description: data.description as string,
    createdBy: session?.user.id,
    createdByEmail: session?.user.email,
  };

  console.log("Step 4", payload);

  setIsLoading(true);

  try {
    console.log("Step 5");

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/plants`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    console.log("Step 6", response.status);

    const result = await response.json();

    console.log("Step 7", result);

    if (!response.ok) {
      throw new Error(result.message || "Failed to add plant");
    }

    toast.success("Plant added successfully!");

    formRef.current?.reset();

    router.push("/explore");
  } catch (error) {
    console.error(error);
    toast.error("Failed to add plant.");
  } finally {
    setIsLoading(false);
  }
};

  const categories = ["Indoor", "Outdoor", "Succulent", "Flowering", "Herb", "Vegetable"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const wateringOptions = ["Every day", "Every 3 days", "Weekly", "Every 2 weeks", "Monthly"];
  const sunlightOptions = ["Full Sun", "Partial Sun", "Indirect Light", "Low Light"];

  return (
    <div className="min-h-screen bg-background-cream py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-4xl bg-white p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100"
      >
        <div className="mb-10 border-b border-gray-100 pb-6 text-center">
          <h1 className="text-4xl font-bold text-primary-dark mb-3 tracking-tight">Add a New Plant</h1>
          <p className="text-gray-500 text-lg">Contribute to the PlantPal ecosystem by documenting a new species.</p>
        </div>

        <Form
          ref={formRef}
          validationBehavior="native"
          onSubmit={handleSubmit}
          className="flex flex-col gap-8 w-full"
        >
          {/* Row 1: Title and Scientific Name */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <TextField
              isRequired
              name="title"
              type="text"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (!value) return "Title is required";
                return null;
              }}
            >
              <Label className="text-gray-700 font-semibold text-sm">Plant Title</Label>
              <Input
                placeholder="e.g. Monstera Deliciosa"
                className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>

            <TextField
              isRequired
              name="scientificName"
              type="text"
              className="w-full flex flex-col gap-1.5"
              validate={(value) => {
                if (!value) return "Scientific Name is required";
                return null;
              }}
            >
              <Label className="text-gray-700 font-semibold text-sm">Scientific Name</Label>
              <Input
                placeholder="e.g. Monstera deliciosa Liebm."
                className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
              />
              <FieldError className="text-red-500 text-xs mt-1" />
            </TextField>
          </div>

          {/* Row 2: Category and Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Select
              isRequired
              name="category"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-gray-700 font-semibold text-sm">Category</Label>
              <Select.Trigger className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors">
                <Select.Value placeholder="Select a category" />
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
              <FieldError className="text-red-500 text-xs mt-1" />
            </Select>

            <Select
              isRequired
              name="difficulty"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-gray-700 font-semibold text-sm">Difficulty</Label>
              <Select.Trigger className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors">
                <Select.Value placeholder="Select care difficulty" />
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
              <FieldError className="text-red-500 text-xs mt-1" />
            </Select>
          </div>

          {/* Row 3: Watering and Sunlight */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            <Select
              isRequired
              name="wateringFrequency"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-gray-700 font-semibold text-sm">Watering Frequency</Label>
              <Select.Trigger className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors">
                <Select.Value placeholder="How often?" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {wateringOptions.map((opt) => (
                    <ListBox.Item key={opt} id={opt} textValue={opt}>
                      <Label>{opt}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError className="text-red-500 text-xs mt-1" />
            </Select>

            <Select
              isRequired
              name="sunlight"
              className="w-full flex flex-col gap-1.5"
            >
              <Label className="text-gray-700 font-semibold text-sm">Sunlight Requirements</Label>
              <Select.Trigger className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors">
                <Select.Value placeholder="Select sunlight" />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {sunlightOptions.map((opt) => (
                    <ListBox.Item key={opt} id={opt} textValue={opt}>
                      <Label>{opt}</Label>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
              <FieldError className="text-red-500 text-xs mt-1" />
            </Select>
          </div>

          {/* Row 4: Radio Groups */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full bg-gray-50/50 p-6 rounded-2xl border border-gray-100">
            <RadioGroup isRequired name="petFriendly">
              <Label>Is it Pet Friendly?</Label>

              <div className="flex gap-6 mt-2">
                <Radio value="yes">
                  <Radio.Content>
                    <Radio.Control />
                    Yes
                  </Radio.Content>
                </Radio>

                <Radio value="no">
                  <Radio.Content>
                    <Radio.Control />
                    No
                  </Radio.Content>
                </Radio>
              </div>

              <FieldError />
            </RadioGroup>

            <RadioGroup isRequired name="indoor">
              <Label>Is it an Indoor Plant?</Label>

              <div className="flex gap-6 mt-2">
                <Radio value="yes">
                  <Radio.Content>
                    <Radio.Control />
                    Yes
                  </Radio.Content>
                </Radio>

                <Radio value="no">
                  <Radio.Content>
                    <Radio.Control />
                    No
                  </Radio.Content>
                </Radio>
              </div>

              <FieldError />
            </RadioGroup>
          </div>

          {/* Image URL */}
          <TextField
            name="image"
            type="url"
            className="w-full flex flex-col gap-1.5"
          >
            <Label className="text-gray-700 font-semibold text-sm">Image URL (Optional)</Label>
            <Input
              placeholder="https://example.com/plant.jpg"
              className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Descriptions */}
          <TextField
            isRequired
            name="shortDescription"
            type="text"
            className="w-full flex flex-col gap-1.5"
            validate={(value) => {
              if (!value) return "Short Description is required";
              if (value.length > 120) return "Maximum 120 characters allowed";
              return null;
            }}
          >
            <Label className="text-gray-700 font-semibold text-sm">Short Description</Label>
            <Input
              placeholder="A brief overview of the plant..."
              className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
            />
            <p className="text-xs text-gray-400 mt-1">Maximum 120 characters</p>
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          <TextField
            isRequired
            name="description"
            className="w-full flex flex-col gap-1.5"
            validate={(value) => {
              if (!value) return "Full Description is required";
              return null;
            }}
          >
            <Label className="text-gray-700 font-semibold text-sm">Full Description</Label>
            <TextArea
              placeholder="Provide a detailed care guide, history, or interesting facts..."
              minRows={5}
              classNames={{
                inputWrapper: "border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors shadow-none",
              }}
            />
            <FieldError className="text-red-500 text-xs mt-1" />
          </TextField>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 pt-6 border-t border-gray-100">
            <Button
              type="submit"
              isLoading={isLoading}
              className="w-full sm:w-2/3 bg-primary-green text-white font-bold shadow-lg shadow-primary-green/20 hover:shadow-primary-green/30 text-lg transition-all"
              size="lg"
              radius="md"
            >
              Add Plant
            </Button>
            <Button
              type="reset"
              variant="flat"
              className="w-full sm:w-1/3 bg-gray-100 text-gray-700 font-semibold shadow-sm hover:bg-gray-200 text-lg transition-all"
              size="lg"
              radius="md"
            >
              Reset
            </Button>
          </div>
        </Form>
      </motion.div>
    </div>
  );
}
