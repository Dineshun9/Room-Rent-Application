import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaHeart, FaSignOutAlt, FaHome } from "react-icons/fa";
import API from "../utils/api"; // ✅ Correct link to shared API instance

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    // Load cached user info first for faster UI
    const storedUser = {
      name: localStorage.getItem("userName"),
      email: localStorage.getItem("userEmail"),
      role: localStorage.getItem("userRole"),
    };

    if (storedUser.name && storedUser.email && storedUser.role) {
      setUser(storedUser);
    }

    // Fetch fresh user info from backend (if logged in)
    if (token) {
      API.get("/users/profile")
        .then((res) => {
          const { name, email, role } = res.data;
          setUser({ name, email, role: role.toLowerCase() });

          // Update localStorage
          localStorage.setItem("userName", name);
          localStorage.setItem("userEmail", email);
          localStorage.setItem("userRole", role.toLowerCase());
        })
        .catch((err) => {
          console.error("Failed to fetch user info:", err.response?.data || err.message);
        });
    }
  }, [token]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* Profile Avatar Button */}
      {token && (
        <div className="absolute top-4 left-4">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="rounded-full overflow-hidden border-2 border-yellow-400 hover:scale-105 transition duration-200"
          >
            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Profile"
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
        </div>
      )}

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
            />

            {/* Sidebar Panel */}
            <motion.div
              initial={{ x: -250 }}
              animate={{ x: 0 }}
              exit={{ x: -250 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="fixed top-0 left-0 w-64 h-full bg-gray-800 text-white z-50 p-5 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-bold text-yellow-400">Profile</h2>
                  <button onClick={() => setIsSidebarOpen(false)}>
                    <FaTimes className="text-gray-400 hover:text-yellow-400 text-xl" />
                  </button>
                </div>

                {/* User Info */}
                <div className="flex flex-col items-center mb-8">
                  <img
                    src="https://i.pravatar.cc/150?img=12"
                    alt="User"
                    className="w-20 h-20 rounded-full border-4 border-yellow-400 mb-3"
                  />
                  <h3 className="text-xl font-semibold">{user?.name || "Guest User"}</h3>
                  <p className="text-gray-400 text-sm">{user?.email || "guest@example.com"}</p>
                  <span className="mt-2 inline-block bg-yellow-500 text-black text-xs px-3 py-1 rounded-full uppercase font-semibold">
                    {user?.role || "tenant"}
                  </span>
                </div>

                {/* Sidebar Links */}
                <div className="space-y-4">
                  <Link
                    to="/home"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 hover:text-yellow-400 transition"
                  >
                    <FaHome /> Home
                  </Link>

                  <Link
                    to="/favorites"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 hover:text-yellow-400 transition"
                  >
                    <FaHeart /> Favorites
                  </Link>

                  {/* Owner Links */}
                  {user?.role === "owner" && (
                    <>
                      <Link
                        to="/my-rooms"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 hover:text-yellow-400 transition"
                      >
                        <FaHome /> My Rooms
                      </Link>

                      <Link
                        to="/add-room"
                        onClick={() => setIsSidebarOpen(false)}
                        className="flex items-center gap-3 hover:text-yellow-400 transition"
                      >
                        ➕ Add Room
                      </Link>
                    </>
                  )}
                </div>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition duration-200 mt-8"
              >
                <FaSignOutAlt /> Logout
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileSidebar;
