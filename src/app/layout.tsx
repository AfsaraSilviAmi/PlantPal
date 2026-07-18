import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import NavBar from "@/components/navbar";
import { ToastContainer } from "react-toastify";
import AIChat from "@/components/AIChat";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlantPal AI",
  description: "Your Full Stack AI web application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background-cream text-primary-dark">
        <Providers>
          <NavBar />
          {children}
        </Providers>
        <AIChat></AIChat>
        <ToastContainer></ToastContainer>
      </body>
    </html>
  );
}
