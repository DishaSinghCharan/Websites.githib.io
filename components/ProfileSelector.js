"use client";

export default function ProfileSelector({ userType, setUserType }) {
  return (
    <div className="flex flex-col gap-6 items-center text-white">
      <button
        className={`py-4 px-8 rounded-xl text-xl font-semibold transition-all duration-300 ease-in-out transform ${
          userType === "elder"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => setUserType("elder")}
      >
        I am an Elder seeking connection
      </button>

      <button
        className={`py-4 px-8 rounded-xl text-xl font-semibold transition-all duration-300 ease-in-out transform ${
          userType === "teen"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => setUserType("teen")}
      >
        I am a Teen/Young Adult seeking support
      </button>

      <button
        className={`py-4 px-8 rounded-xl text-xl font-semibold transition-all duration-300 ease-in-out transform ${
          userType === "other"
            ? "bg-black text-white hover:bg-gray-800"
            : "bg-white text-black border-2 border-gray-300 hover:bg-gray-100"
        }`}
        onClick={() => setUserType("other")}
      >
        Other
      </button>
    </div>
  );
}
