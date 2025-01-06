"use client";

import Link from "next/link";
import Head from "next/head";

export default function Header() {
  return (
    <>
      {/* Preconnect and Import Fonts */}
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Lemon&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header
        className="bg-white text-black py-4 shadow-lg relative"
        style={{ fontFamily: "Space Mono, monospace" }}
      >
        <div className="text-center">
          {/* Logo */}
          <img
            src="/Websites.githib.io/logo.jpeg" // Ensure logo.jpeg is placed in the public folder
            alt="FAM4U Logo"
            className="w-auto h-20 mx-auto mb-2" // Adjust width and height as needed
          />
        </div>

        {/* Donation Icon as Custom Image inside a small circle at Top Right */}
        <div className="absolute top-20 right-4 bg-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-700">
          <Link href="/donation" passHref>
            <img
              src="/Websites.githib.io/LOVE.png" // Ensure this image is placed in the public folder
              alt="Give Love Icon"
              className="w-6 h-6 object-contain" // Adjust size of the image
            />
          </Link>
        </div>

        {/* Navigation Bar */}
        <nav className="mt-4">
          <ul className="flex justify-center space-x-12 text-lg">
            <li>
              <Link
                href="/home"
                className="relative group text-black transition-all duration-200 ease-in-out"
                style={{ fontFamily: "Space Mono, monospace" }} // Space Mono font for nav items
              >
                <span className="group-hover:text-gray-700">Home</span>
                <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></div>
              </Link>
            </li>
            <li>
              <Link
                href="/messages"
                className="relative group text-black transition-all duration-200 ease-in-out"
                style={{ fontFamily: "Space Mono, monospace" }} // Space Mono font for nav items
              >
                <span className="group-hover:text-gray-700">Messages</span>
                <div className="absolute left-0 bottom-0 w-full h-1 bg-gradient-to-r from-blue-500 to-green-400 scale-x-0 group-hover:scale-x-100 transition-all duration-300"></div>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
