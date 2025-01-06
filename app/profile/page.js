// /app/profile/page.js
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Fetch user data or check if user is logged in
    const userData = { name: "John Doe", email: "john@example.com" }; // Mock user data
    setUser(userData);
  }, []);

  const handleLogout = () => {
    // Perform logout logic (e.g., remove token or session)
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Welcome, {user?.name}
        </h2>
        <p className="text-gray-600 mb-4">Email: {user?.email}</p>
        <button
          onClick={handleLogout}
          className="w-full py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700 transition-all"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
