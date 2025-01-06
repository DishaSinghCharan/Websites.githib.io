"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [users, setUsers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchStatus, setMatchStatus] = useState("");
  const [error, setError] = useState("");
  const [matchedUsers, setMatchedUsers] = useState([]);
  const router = useRouter();

  // Fetch users and matched users on page load
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/Websites.githib.io/users");
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setError("Could not load users. Please try again later.");
      }
    };

    const fetchMatchedUsers = async () => {
      try {
        const res = await fetch("/Websites.githib.io/matches");
        if (!res.ok) throw new Error("Failed to fetch matched users");
        const data = await res.json();
        setMatchedUsers(data);
      } catch (error) {
        console.error("Failed to fetch matched users:", error);
        setError("Could not load matched users. Please try again later.");
      }
    };

    fetchUsers();
    fetchMatchedUsers();
  }, []);

  const handleSwipe = async (direction) => {
    if (direction === "right") {
      const currentUserId = 1; // Replace with the logged-in user's ID
      const swipedUserId = users[currentIndex]?.id;

      if (!swipedUserId) return;

      // Check if the user is already matched
      if (isMatched(swipedUserId)) {
        setMatchStatus("Already matched");
        return;
      }

      try {
        const response = await fetch("//Websites.githib.io/match", {
          method: "POST",
          body: JSON.stringify({
            user1_id: currentUserId,
            user2_id: swipedUserId,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          setMatchStatus("");
        } else {
          setError("");
          setMatchStatus("Match added successfully!");
          setMatchedUsers((prevMatchedUsers) => [
            ...prevMatchedUsers,
            { user1_id: currentUserId, user2_id: swipedUserId },
          ]);

          // Automatically move to the next user
          if (currentIndex < users.length - 1) {
            setCurrentIndex(currentIndex + 1);
          } else {
            setCurrentIndex(0); // Reset to the first user if at the end of the list
          }
        }
      } catch (error) {
        console.error("Failed to process swipe:", error);
        setError("An unexpected error occurred.");
        setMatchStatus("");
      }
    } else {
      // For left swipe, move to the next user
      if (currentIndex < users.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex(0);
      }
    }
  };

  // Check if the current user is matched
  const isMatched = (userId) => {
    return matchedUsers.some(
      (match) =>
        (match.user1_id === userId && match.user2_id === 1) ||
        (match.user2_id === userId && match.user1_id === 1)
    );
  };

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white text-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="relative w-full max-w-md">
          {/* User Card */}
          <div
            className="relative rounded-lg shadow-xl overflow-hidden w-full"
            style={{ height: "400px" }}
          >
            {/* Display "Matched" label if the user is matched */}
            {isMatched(users[currentIndex].id) && (
              <div className="absolute top-4 right-4 bg-gradient-to-r from-gray-300 to-gray-500 text-black text-xl font-semibold px-6 py-2 rounded-full shadow-xl transform transition-all hover:scale-105">
                Matched
              </div>
            )}

            <img
              src={users[currentIndex].image}
              alt={users[currentIndex].name}
              className="w-full h-full object-cover transition-all hover:scale-105"
            />
            <div className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent p-4">
              <h2 className="text-white text-2xl font-semibold">
                {users[currentIndex].name}
              </h2>
              <p className="text-white text-lg">
                {users[currentIndex].description}
              </p>
            </div>
          </div>

          {/* Swipe Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={() => handleSwipe("left")}
              className="bg-gray-700 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-600 transition-all"
            >
              Swipe Left
            </button>
            <button
              onClick={() => handleSwipe("right")}
              className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-gray-500 transition-all"
            >
              Swipe Right
            </button>
          </div>

          {/* Match Status or Error */}
          {matchStatus && (
            <div className="mt-4 text-lg font-semibold text-white">
              {matchStatus}
            </div>
          )}
          {error && (
            <div className="mt-4 text-lg font-semibold text-red-500">
              {error}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
