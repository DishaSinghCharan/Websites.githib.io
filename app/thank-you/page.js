"use client";

import Head from "next/head";

export default function ThankYou() {
  return (
    <div className="bg-white text-gray-300 min-h-screen flex flex-col items-center justify-center">
      {/* Add custom font imports for Lemon and Nunito Sans */}
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Lemon&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
          `}
        </style>
      </Head>

      {/* Logo at the top center */}
      <img
        src="/Websites.githib.io/logo.jpeg" // Make sure logo.jpeg is in the public folder
        alt="FAM4U Logo"
        className="mb-8 w-100 h-100 object-contain mt-3"
      />

      <h1
        className="text-4xl font-bold text-black mb-4"
        style={{ fontFamily: "Lemon, sans-serif" }} // Applying Lemon font to the heading
      >
        Thank You!
      </h1>
      <p
        className="text-lg text-black mb-8 text-center"
        style={{ fontFamily: "Nunito Sans, sans-serif" }} // Applying Nunito Sans font to the paragraph
      >
        Your donation is making a difference in connecting hearts and easing
        loneliness.
      </p>
    </div>
  );
}
