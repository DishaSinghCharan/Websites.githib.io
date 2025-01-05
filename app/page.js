// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation"; // Correct import for useRouter in Next.js 13+
// import Header from "../components/Header";
// import Footer from "../components/Footer";
// import ProfileSelector from "../components/ProfileSelector";
// import LoginForm from "../components/LoginForm";

// export default function Home() {
//   const [userType, setUserType] = useState("");
//   const [showLoginForm, setShowLoginForm] = useState(false); // State to control LoginForm visibility
//   const router = useRouter();

//   const handleProceed = () => {
//     // You can perform any logic or validation before showing the login form
//     if (userType) {
//       setShowLoginForm(true); // Show the LoginForm when Proceed is clicked
//     } else {
//       alert("Please select a profile type before proceeding.");
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex flex-col">
//       <Header />

//       <main className="flex-grow flex flex-col items-center justify-center p-4">
//         <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
//           <h2 className="text-2xl font-semibold mb-4 text-gray-800">
//             Join the FAM4U Community
//           </h2>
//           <p className="text-gray-600 mb-6">Select your profile type:</p>

//           <ProfileSelector userType={userType} setUserType={setUserType} />

//           {userType && (
//             <div className="mt-6">
//               <p className="text-gray-700">
//                 You selected:{" "}
//                 <strong>
//                   {userType === "elder"
//                     ? "Elder"
//                     : userType === "teen"
//                     ? "Teen/Young Adult"
//                     : "Other"}
//                 </strong>
//               </p>
//               <button
//                 onClick={handleProceed}
//                 className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
//               >
//                 Proceed to Sign Up
//               </button>
//             </div>
//           )}

//           {/* Render LoginForm when showLoginForm is true */}
//           {showLoginForm && <LoginForm />}
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// }
// app/page.js
// /app/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProfileSelector from "../components/ProfileSelector";

export default function Home() {
  const [userType, setUserType] = useState("");
  const router = useRouter();

  const handleProceed = () => {
    if (userType) {
      router.push("/login");
    } else {
      alert("Please select a profile type");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Join the FAM4U Community
          </h2>
          <p className="text-gray-600 mb-6">Select your profile type:</p>

          <ProfileSelector userType={userType} setUserType={setUserType} />

          {userType && (
            <div className="mt-6">
              <p className="text-gray-700">
                You selected: <strong>{userType}</strong>
              </p>
              <button
                onClick={handleProceed}
                className="mt-4 py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
              >
                Proceed to Login
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
