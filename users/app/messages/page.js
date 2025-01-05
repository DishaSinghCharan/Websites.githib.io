"use client";

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Messages() {
  const [matches, setMatches] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [activeProfile, setActiveProfile] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("/Website.github.io/matches");
        const data = await res.json();
        setMatches(data);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const openChat = (user) => {
    setActiveChat(user);
    setMessages([]);
    setActiveProfile(null);
  };

  const openProfile = (user) => {
    setActiveProfile(user);
    setActiveChat(null);
  };

  const sendMessage = () => {
    if (messageInput.trim() !== "") {
      setMessages([...messages, { from: "user", text: messageInput }]);
      setMessageInput("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { from: "user2", text: "That's awesome! Let's chat more." },
        ]);
      }, 1000);
    }
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-800 text-white min-h-screen flex flex-col font-sans">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        {activeChat ? (
          <div className="w-full max-w-2xl p-6 mb-6 bg-black bg-opacity-80 rounded-xl shadow-xl transition transform hover:scale-105">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold text-white">
                {activeChat.user2_name}
              </h3>
              <button
                onClick={() => setActiveChat(null)}
                className="text-white text-3xl hover:text-gray-300 transition"
                aria-label="Close chat"
              >
                &times;
              </button>
            </div>

            <div className="h-80 overflow-y-scroll p-4 bg-gray-800 bg-opacity-90 rounded-lg mb-6 shadow-inner">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  } mb-4`}
                >
                  <div
                    className={`${
                      msg.from === "user"
                        ? "bg-gray-600 text-white"
                        : "bg-white text-gray-800"
                    } p-4 rounded-lg max-w-lg shadow-md`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center">
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="bg-gray-700 text-white p-4 rounded-l-full w-full shadow-inner focus:outline-none focus:ring-2 focus:ring-white transition"
              />
              <button
                onClick={sendMessage}
                className="bg-gray-600 text-white px-6 py-4 rounded-r-full shadow-md hover:bg-gray-500 transition"
              >
                Send
              </button>
            </div>
          </div>
        ) : activeProfile ? (
          <div className="w-full max-w-2xl p-6 mb-6 bg-black bg-opacity-80 rounded-xl shadow-xl transition transform hover:scale-105">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-semibold">
                {activeProfile.user2_name}
              </h3>
              <button
                onClick={() => setActiveProfile(null)}
                className="text-white text-3xl hover:text-gray-300 transition"
                aria-label="Close profile"
              >
                &times;
              </button>
            </div>
            <div className="mb-6">
              <img
                src={activeProfile.user2_image}
                alt={activeProfile.user2_name}
                className="w-full h-72 object-cover rounded-lg mb-6 shadow-lg transition transform hover:scale-105"
              />
              <p className="mb-2">
                <strong>Age:</strong> {activeProfile.user2_age}
              </p>
              <p className="mb-2">
                <strong>Location:</strong> {activeProfile.user2_location}
              </p>
              <p>
                <strong>Bio:</strong> {activeProfile.user2_bio}
              </p>
            </div>
          </div>
        ) : (
          matches.map((match) => (
            <div
              key={match.user1_id}
              className="w-full max-w-2xl p-6 mb-6 bg-black bg-opacity-80 rounded-xl shadow-xl hover:scale-105 transition transform"
            >
              <img
                src={match.user2_image}
                alt={match.user2_name}
                className="w-full h-72 object-cover rounded-t-xl shadow-md transition transform hover:scale-105"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white">
                  {match.user2_name}
                </h3>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => openChat(match)}
                  className="bg-gray-600 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-500 transition"
                >
                  Text
                </button>
                <button
                  onClick={() => openProfile(match)}
                  className="bg-gray-700 text-white px-6 py-3 rounded-full shadow-md hover:bg-gray-600 transition"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </main>
      <Footer />
    </div>
  );
}
