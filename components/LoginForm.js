"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    // Validate fields
    if (!email || !password) {
      alert("All fields are required.");
      return;
    }

    if (email !== "user@example.com" || password !== "password123") {
      alert("Invalid email or password.");
      return;
    }

    // Perform login logic
    console.log("Logging in with:", { email, password });

    // On successful login, redirect to the details page
    router.push("/details"); // Redirect to details page
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-800 min-h-screen flex flex-col text-white font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="bg-black bg-opacity-80 p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all hover:scale-105">
          <h2 className="text-2xl font-semibold mb-6 text-white">
            Login to FAM4U
          </h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 mb-6 bg-gray-700 text-white border border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-white transition-all"
          />
          <button
            onClick={handleLogin}
            className="w-full py-3 px-6 bg-gray-600 text-white rounded-full shadow-md hover:bg-gray-500 transition-all"
          >
            Login
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
