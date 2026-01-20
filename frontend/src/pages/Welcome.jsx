import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="text-center space-y-6 p-6 max-w-md">
        {/* App Name */}
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-yellow-400">RoomEase</span>
        </h1>

        {/* Tagline */}
        <p className="text-gray-300 text-lg">
          Find your perfect room with comfort and trust 🏠
        </p>

        {/* Floating Info Box */}
        <div className="bg-gray-800/70 p-4 rounded-xl shadow-md">
          <p className="text-sm text-gray-400">
            Browse, book, and manage rental rooms easily — your next home is just a click away.
          </p>
        </div>

        {/* Next Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-3 rounded-full transition-all duration-200"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;

