"use client";

import React, { useState } from "react";
import { Form, TextField, Label, Input, FieldError, Button} from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthLayout } from "@/components/auth-layout";

export default function RegisterPage() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const image = formData.get("image") as string;

    setIsLoading(true);
    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        ...(image ? { image } : {}),
      });
      
      if (error) {
        toast.error(error.message || "Registration failed. Please try again.");
      } else {
        toast.success("Successfully registered! Redirecting...");
        router.push("/login");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
      });
    } catch (error) {
      toast.error("Google login failed.");
    }
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join PlantPal AI today and grow your digital ecosystem."
    >
      <Form
        validationBehavior="native"
        onSubmit={handleRegister}
        className="flex w-full flex-col gap-5"
      >
        <TextField
          isRequired
          name="name"
          type="text"
          className="w-full flex flex-col gap-1"
          validate={(value) => {
            if (!value) return "Name is required";
            return null;
          }}
        >
          <Label className="text-gray-700 font-medium">Full Name</Label>
          <Input 
            placeholder="John Doe" 
            className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
          />
          <FieldError className="text-red-500 text-xs" />
        </TextField>

        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full flex flex-col gap-1"
          validate={(value) => {
            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
              return "Please enter a valid email address";
            }
            return null;
          }}
        >
          <Label className="text-gray-700 font-medium">Email Address</Label>
          <Input 
            placeholder="john@example.com"
            className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
          />
          <FieldError className="text-red-500 text-xs" />
        </TextField>

        <TextField
          name="image"
          type="url"
          className="w-full flex flex-col gap-1"
        >
          <Label className="text-gray-700 font-medium">Profile Image URL (Optional)</Label>
          <Input 
            placeholder="https://example.com/avatar.jpg"
            className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors"
          />
          <FieldError className="text-red-500 text-xs" />
        </TextField>

        <TextField
          isRequired
          name="password"
          type={isVisible ? "text" : "password"}
          className="w-full flex flex-col gap-1"
          validate={(value) => {
            if (value.length < 8) return "Password must be at least 8 characters long.";
            if (!/[A-Z]/.test(value)) return "Password must contain at least one uppercase letter.";
            if (!/[a-z]/.test(value)) return "Password must contain at least one lowercase letter.";
            return null;
          }}
        >
          <Label className="text-gray-700 font-medium">Password</Label>
          <div className="relative w-full">
            <Input 
              placeholder="Create a strong password"
              className="border-gray-200 hover:border-primary-green focus-within:!border-primary-green rounded-xl transition-colors w-full"
            />
            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 focus:outline-none p-1 rounded-md hover:bg-gray-100 transition-colors z-10"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <FaEyeSlash className="text-xl text-default-400" />
              ) : (
                <FaEye className="text-xl text-default-400" />
              )}
            </button>
          </div>
          <FieldError className="text-red-500 text-xs" />
        </TextField>

        <Button
          type="submit"
          isDisabled={isLoading}
          className="w-full bg-primary-green text-white font-semibold shadow-lg shadow-primary-green/20 hover:shadow-primary-green/30 mt-2 text-md transition-all"
          size="lg"
         
        >
          Create Account
        </Button>

        <div className="flex w-full items-center gap-4 py-2 opacity-70">
          <div className="h-[1px] flex-1 bg-gray-300" />
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">OR</span>
          <div className="h-[1px] flex-1 bg-gray-300" />
        </div>

        <Button 
          type="button"
          onPress={handleGoogleLogin}
          className="w-full" 
          variant="tertiary"
        >
          <Icon icon="devicon:google" />
          Sign in with Google
        </Button>
      </Form>

      <div className="text-center mt-8">
        <p className="text-gray-600 text-sm">
          Already have an account?{" "}
         <Link
  href="/login"
  className="text-primary-green font-semibold hover:text-[#4aa35b] transition-colors"
>
  Login
</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
