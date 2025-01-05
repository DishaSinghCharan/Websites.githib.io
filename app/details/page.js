"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function UserDetails() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userDetails, setUserDetails] = useState({
    name: "",
    birthday: "",
    gender: "",
    location: "",
  });
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const router = useRouter();

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const getLocation = () => {
    if ("geolocation" in navigator && locationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserDetails((prevDetails) => ({
            ...prevDetails,
            location: `Latitude: ${latitude}, Longitude: ${longitude}`,
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log(
        "Geolocation is not available or location tracking is disabled."
      );
    }
  };

  useEffect(() => {
    if (locationEnabled) {
      getLocation();
    }
  }, [locationEnabled]);

  const isValidStep = () => {
    switch (currentStep) {
      case 1:
        return userDetails.name.trim() !== "";
      case 2:
        return userDetails.birthday.trim() !== "";
      case 3:
        return userDetails.gender.trim() !== "";
      case 4:
        return locationEnabled || userDetails.location.trim() !== "";
      default:
        return false;
    }
  };

  const handleNextStep = () => {
    if (!isValidStep()) return;
    setFadeIn(false);
    setTimeout(() => {
      if (currentStep < 4) {
        setCurrentStep(currentStep + 1);
      }
      setFadeIn(true);
    }, 300);
  };

  const handleSubmitDetails = () => {
    if (!isValidStep()) return;
    console.log("User details submitted:", userDetails);
    router.push("/Websites.githib.io/home");
  };

  return (
    <div className="bg-gradient-to-br from-black to-gray-800 min-h-screen flex flex-col text-white">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div
          className={`bg-black bg-opacity-80 p-8 rounded-lg shadow-xl w-full max-w-3xl transition-all duration-500 ease-in-out transform ${
            fadeIn ? "opacity-100" : "opacity-0 translate-y-4"
          }`}
        >
          <h2
            className={`text-4xl font-semibold mb-6 text-white transition-all duration-500 ease-in-out ${
              fadeIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Enter Your Details
          </h2>
          <form>
            {/* Step 1: Name */}
            {currentStep === 1 && (
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={userDetails.name}
                  onChange={handleDetailsChange}
                  className="w-full p-4 mb-6 border border-gray-600 rounded-lg text-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>
            )}

            {/* Step 2: Birthday */}
            {currentStep === 2 && (
              <div>
                <input
                  type="date"
                  name="birthday"
                  value={userDetails.birthday}
                  onChange={handleDetailsChange}
                  className="w-full p-4 mb-6 border border-gray-600 rounded-lg text-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                />
              </div>
            )}

            {/* Step 3: Gender */}
            {currentStep === 3 && (
              <div>
                <select
                  name="gender"
                  value={userDetails.gender}
                  onChange={handleDetailsChange}
                  className="w-full p-4 mb-6 border border-gray-600 rounded-lg text-xl bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-white transition-all"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            )}

            {/* Step 4: Location Toggle */}
            {currentStep === 4 && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <label className="text-xl text-blue-500">
                    Enable Location
                  </label>
                  <input
                    type="checkbox"
                    checked={locationEnabled}
                    onChange={() => setLocationEnabled(!locationEnabled)}
                    className="h-6 w-6 bg-gray-700"
                  />
                </div>
              </div>
            )}

            {/* Conditional button rendering based on the step */}
            <div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={!isValidStep()}
                  className={`w-full py-3 px-6 bg-gray-700 text-gray-200 text-xl rounded-lg hover:bg-gray-600 transition-all mt-6 shadow-sm ${
                    !isValidStep() ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmitDetails}
                  disabled={!isValidStep()}
                  className={`w-full py-3 px-6 bg-gray-700 text-gray-200 text-xl rounded-lg hover:bg-gray-600 transition-all mt-6 shadow-sm ${
                    !isValidStep() ? "cursor-not-allowed opacity-50" : ""
                  }`}
                >
                  Submit Details
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
