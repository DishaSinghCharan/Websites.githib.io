"use client";

import Head from "next/head";
import { useState } from "react";
import confetti from "canvas-confetti";
import { useRouter } from "next/navigation";

export default function ThankYou() {
  const [donationAmount, setDonationAmount] = useState("");
  const [donated, setDonated] = useState(false);
  const router = useRouter();

  const handleDonation = () => {
    if (donationAmount) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setDonated(true);

      setTimeout(() => {
        router.push("/Website.github.io/home");
      }, 2000);
    }
  };

  return (
    <div className="bg-white text-gray-300 min-h-screen flex flex-col items-center justify-center">
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Lemon&family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap');
          `}
        </style>
      </Head>

      <img
        src="/logo.jpeg"
        alt="FAM4U Logo"
        className="mb-8 w-32 h-32 object-contain mt-3"
      />

      <h1
        className="text-4xl font-bold text-black mb-4"
        style={{ fontFamily: "Lemon, sans-serif" }}
      >
        Thank You!
      </h1>
      <p
        className="text-lg text-black mb-8 text-center"
        style={{ fontFamily: "Nunito Sans, sans-serif" }}
      >
        Your donation is making a difference in connecting hearts and easing
        loneliness.
      </p>

      {!donated ? (
        <>
          <p className="text-lg text-black mb-4">Enter Donation Amount:</p>
          <input
            type="number"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            placeholder="Enter amount"
            className="px-4 py-2 mb-4 border border-gray-300 rounded-lg text-lg"
          />
          <button
            onClick={handleDonation}
            className="px-6 py-3 bg-red-500 text-white rounded-full text-lg mt-4 transition-all duration-200 ease-in-out hover:bg-red-600"
          >
            Confirm Donation
          </button>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center mt-8">
          <span className="material-icons text-6xl text-green-500">✅</span>
          <p className="text-lg text-black mt-4">Donation Confirmed!</p>
        </div>
      )}
    </div>
  );
}
