"use client";

import React, { useState, useRef } from "react";
import { Form, TextField, Label, Input, FieldError, Button, Link as NextUILink } from "@heroui/react";
import Link from "next/link";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Icon } from "@iconify/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { AuthLayout } from "@/components/auth-layout";

export default function LoginPage() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setIsLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
      });
      
      if (error) {
        toast.error(error.message || "Login failed. Please check your credentials.");
      } else {
        toast.success("Successfully logged in!");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    if (formRef.current) {
      const emailInput = formRef.current.querySelector('input[name="email"]') as HTMLInputElement;
      const passwordInput = formRef.current.querySelector('input[name="password"]') as HTMLInputElement;
      if (emailInput) emailInput.value = "demo@plantpal.ai";
      if (passwordInput) passwordInput.value = "Demo1234";
    }

    setIsDemoLoading(true);
    try {
      const { error } = await authClient.signIn.email({
        email: "demo@plantpal.ai",
        password: "Demo1234",
      });
      
      if (error) {
        toast.error(error.message || "Demo login failed.");
      } else {
        toast.success("Successfully logged in with Demo Account!");
        router.push("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
    } finally {
      setIsDemoLoading(false);
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
      title="Welcome Back"
      subtitle="Sign in to your PlantPal AI account and manage your ecosystem."
    >
      <Form
        ref={formRef}
        validationBehavior="native"
        onSubmit={handleLogin}
        className="flex w-full flex-col gap-6"
      >
        <TextField
          isRequired
          name="email"
          type="email"
          className="w-full flex flex-col gap-1"
          validate={(value) => {
            if (!value) return "Email is required";
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
          isRequired
          name="password"
          type={isVisible ? "text" : "password"}
          className="w-full flex flex-col gap-1"
          validate={(value) => {
            if (!value) return "Password is required";
            return null;
          }}
        >
          <Label className="text-gray-700 font-medium">Password</Label>
          <div className="relative w-full">
            <Input 
              placeholder="Enter your password"
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

        <div className="flex flex-col gap-3 mt-2">
          <Button
            type="submit"
            isLoading={isLoading}
            isDisabled={isDemoLoading}
            className="w-full bg-primary-green text-white font-semibold shadow-lg shadow-primary-green/20 hover:shadow-primary-green/30 text-md transition-all"
            size="lg"
            radius="md"
          >
            Log In
          </Button>

          <Button
            type="button"
            onPress={handleDemoLogin}
            isLoading={isDemoLoading}
            isDisabled={isLoading}
            variant="flat"
            className="w-full bg-primary-dark text-white font-semibold shadow-md hover:bg-[#12311d] transition-all"
            size="lg"
            radius="md"
          >
            Demo Login
          </Button>
        </div>

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
          Don't have an account?{" "}
          <NextUILink as={Link} href="/register" className="text-primary-green font-semibold hover:text-[#4aa35b] transition-colors">
            Sign up
          </NextUILink>
        </p>
      </div>
    </AuthLayout>
  );
}
