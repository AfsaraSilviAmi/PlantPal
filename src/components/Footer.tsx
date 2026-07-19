"use client";

import Image from "next/image";
import Link from "next/link";
import {
    FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLeaf,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#2F4F46] text-white mt-24">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Logo */}

          <div>

            <div className="flex items-center gap-3 mb-5">
             <Image src={"/logo.png"} alt="logo" width={1000} height={1000} className="w-30"></Image>
            </div>

            <p className="text-gray-300 leading-7">
              Discover beautiful plants, learn expert care tips,
              connect with fellow plant lovers and grow your garden
              with confidence.
            </p>

          </div>

          {/* Quick Links */}

       

<div>
  <h3 className="font-bold text-lg mb-5">
    Quick Links
  </h3>

  <ul className="space-y-3 text-gray-300">

    <li>
      <Link
        href="/"
        className="hover:text-primary-green transition"
      >
        Home
      </Link>
    </li>

    <li>
      <Link
        href="/plants"
        className="hover:text-primary-green transition"
      >
        All Plants
      </Link>
    </li>

    <li>
      <Link
        href="/about"
        className="hover:text-primary-green transition"
      >
        About Us
      </Link>
    </li>

    <li>
      <Link
        href="/contact"
        className="hover:text-primary-green transition"
      >
        Contact
      </Link>
    </li>

  </ul>
</div>
         

        {/* Contact */}

<div>
  <h3 className="font-bold text-lg mb-5">
    Contact Us
  </h3>

  <div className="space-y-5 text-gray-300">

    <div className="flex items-start gap-3">
      <FaEnvelope className="text-primary-green mt-1 shrink-0" />
      <span>afsarasilvi44@gmail.com</span>
    </div>

    <div className="flex items-start gap-3">
      <FaPhoneAlt className="text-primary-green mt-1 shrink-0" />
      <span>+880 19000000</span>
    </div>

    <div className="flex items-start gap-3">
      <FaMapMarkerAlt className="text-primary-green mt-1 shrink-0" />
      <span>Dhaka, Bangladesh</span>
    </div>

  </div>
</div>
          {/* Social */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Connect With Us
            </h3>

            <p className="text-gray-300 mb-6">
              Join our growing community of plant lovers.
            </p>

            <div className="flex gap-4">

              <a
                href={"/"}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-green transition"
              >
                <FaFacebookF />
              </a>

              <a
                href={"/"}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-green transition"
              >
                <FaInstagram />
              </a>

              <a
                href={"/"}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-green transition"
              >
                <FaGithub />
              </a>

              <a
                href={"/"}
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-green transition"
              >
                <FaLinkedinIn />
              </a>

            </div>

          </div>

        </div>

        {/* Bottom */}

        <div className="border-t border-white/10 mt-14 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">

          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} PlantPal. All rights reserved by Ami.
          </p>

          <p className="text-gray-400 text-sm">
            Built with 💚 for every plant lover.
          </p>

        </div>

      </div>

    </footer>
  );
}