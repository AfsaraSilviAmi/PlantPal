"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar, Button, Dropdown } from "@heroui/react";
import { authClient } from "@/lib/auth-client";


const navLinks = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/plants",
    label: "All Plants",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/recommendations",
    label: "AI Recommendations",
  },
];

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession();

  if (isPending) return null;

  const user = session?.user;

  const handleLogout = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-background-cream border-slate-200 backdrop-blur-xl shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-transform duration-300 hover:scale-105"
        >
         <img
  src="/logo.png"
  alt="logo"
  className="w-13"
/>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative font-medium text-primary-green transition-all duration-300 hover:text-primary-dark
              after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0
              after:bg-gradient-to-r after:from-primary-green after:to-primary-dark
              after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <Dropdown>
              <Button
                isIconOnly
                className="h-auto min-w-0 rounded-full bg-transparent p-1 transition-all duration-300 hover:scale-110 hover:bg-primary-green/10"
              >
                <Avatar className="ring-2 ring-primary-green ring-offset-2">
                  <Avatar.Image
                    src={user.image ?? ""}
                    alt={user.name}
                  />
                  <Avatar.Fallback>
                    {user.name?.charAt(0)}
                  </Avatar.Fallback>
                </Avatar>
              </Button>

              <Dropdown.Popover>
                <Dropdown.Menu className="bg-background-cream">


                  <Dropdown.Item id="add-plant" className="block w-full">
                    <Link href="/plants/add">
                      Add Plant
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item id="manage-plants" className="block w-full">
                    <Link href="/manage-plants">
                      Manage Plants
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item
                    id="logout"
                    variant="danger"
                    className="rounded-lg font-semibold text-red-500 hover:bg-red-50 block w-full"
                    onAction={handleLogout}
                  >
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown.Popover>
            </Dropdown>
          ) : (
            <>
              <Link href="/login">
                <Button
                  className="bg-gradient-to-r from-primary-dark to-primary-green text-white font-semibold transform transition-all duration-300 hover:scale-105"
                >
                  Login
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t md:hidden">
          <div className="flex flex-col gap-4 p-5">
            {user && (
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
                <Avatar className="ring-2 ring-primary-green">
                  <Avatar.Image
                    src={user.image ?? ""}
                    alt={user.name}
                  />
                  <Avatar.Fallback>
                    {user.name?.charAt(0).toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>

                <div className="flex flex-col">
                  <span className="font-semibold text-primary-dark">
                    {user.name}
                  </span>
                  <span className="text-sm text-slate-500">
                    {user.email}
                  </span>
                </div>
              </div>
            )}

            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-slate-700"
                  >
                    {link.label}
                  </Link>
                ))}


                <Link
                  href="/plants/add"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-medium text-primary-green"
                >
                  Add Plant
                </Link>

                <Link
                  href="/manage-plants"
                  onClick={() => setIsMenuOpen(false)}
                  className="font-medium text-primary-green"
                >
                  Manage Plants
                </Link>

                <Button
                  variant="danger-soft"
                  onPress={async () => {
                    await handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-medium text-slate-700"
                  >
                    {link.label}
                  </Link>
                ))}

                <Link
                  href="/login"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Button className="w-full bg-gradient-to-r from-primary-dark to-primary-green text-white">
                    Login
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}