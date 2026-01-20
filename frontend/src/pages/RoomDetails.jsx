import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHeart,
  FaRegHeart,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaHome,
  FaComments,
  FaUser,
} from "react-icons/fa";
import API from "../utils/api";
import Header from "../components/Header";
import ChatBox from "../components/ChatBox";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const currentUserId = localStorage.getItem("userId"); 







  // ✅ Fetch room details + favorite status
  const fetchRoomAndFavoriteStatus = async () => {
    try {
      const [roomRes, favRes] = await Promise.all([
        API.get(`/rooms/${id}`),
        API.get("/users/favorites"), // 👈 assumes your backend returns user's favorites
      ]);

      setRoom(roomRes.data);

      // Check if current room is in user's favorites
      const favorites = favRes.data || [];
      const isFav = favorites.some((favRoom) => favRoom._id === id);
      setIsFavorite(isFav);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to fetch room details");
    }
  };

  // ✅ Toggle Favorite
  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await API.delete(`/users/favorites/${id}`);
        setIsFavorite(false);
      } else {
        await API.post(`/users/favorites/${id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update favorites");
    }
  };

  useEffect(() => {
    fetchRoomAndFavoriteStatus();
  }, [id]);

  if (!room)
    return (
      <div className="flex justify-center items-center h-screen text-gray-400 text-lg animate-pulse">
        Loading room details...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <Header />

      {/* Layout Wrapper */}
      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto mt-8 p-6 gap-6">
        {/* LEFT: Room Details */}
        <motion.div
          className={`flex-1 bg-gray-800 rounded-2xl shadow-2xl p-6 transition-all duration-700 ${
            showChat ? "lg:w-3/4" : "w-full"
          }`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Room Image */}
          <div className="relative">
            <motion.img
              src={room.images?.[0] || "https://www.istockphoto.com/photo/luxury-shangri-la-hotel-room-gm185083188-19503596?utm_source=unsplash&utm_medium=affiliate&utm_campaign=srp_photos_bottom&utm_content=https%3A%2F%2Funsplash.com%2Fs%2Fphotos%2Froom&utm_term=room%3A%3A%3A%3A6c11b409-0f60-4967-b6f9-b92109ab7684"}
              alt={room.title}
              className="w-full h-80 object-cover rounded-xl shadow-lg"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6 }}
            />
            <button
              onClick={toggleFavorite}
              className={`absolute top-4 right-4 bg-gray-900 bg-opacity-60 p-3 rounded-full hover:scale-110 transition ${
                isFavorite ? "text-red-500" : "text-yellow-400"
              }`}
            >
              {isFavorite ? <FaHeart size={22} /> : <FaRegHeart size={22} />}
            </button>
          </div>

          {/* Room Info */}
          <motion.div
            className="mt-6 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-yellow-400 flex items-center gap-2">
              <FaHome className="text-yellow-400" /> {room.title}
            </h2>

            {error && (
              <p className="text-red-500 bg-red-900/20 p-2 rounded-md">
                {error}
              </p>
            )}

            <p className="text-gray-300 leading-relaxed">{room.description}</p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4">
              <div className="flex items-center gap-2 text-gray-400">
                <FaMapMarkerAlt className="text-yellow-400" />
                <span>{room.location}</span>
              </div>

              <div className="flex items-center gap-2 text-yellow-400 font-bold text-xl">
                <FaRupeeSign />
                <span>{room.rent.toLocaleString("en-IN")}/month</span>
              </div>
            </div>

            {/* ✅ Owner Info Section */}
            {room.owner && (
              <div className="flex items-center gap-3 mt-4 bg-gray-700 bg-opacity-40 p-3 rounded-lg">
                <FaUser className="text-yellow-400 text-lg" />
                <div>
                  <p className="font-semibold text-white">
                    Owner: {room.owner.name || "Unknown Owner"}
                  </p>
                  <p className="text-sm text-gray-400">
                    Contact: {room.owner.email || "N/A"}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
            
          <motion.hr
            className="my-8 border-gray-600"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 0.8 }}
          />

          {/* Chat Button */}
          
          {  !showChat && room.owner?._id !== currentUserId &&  (
            <motion.button
              onClick={() => setShowChat(true)}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-400 text-black font-semibold px-6 py-3 rounded-full shadow-md transition hover:scale-105"
              whileTap={{ scale: 0.9 }}
            >
              <FaComments /> Chat with Owner
            </motion.button>
          )}
        </motion.div>

        {/* RIGHT: Chat Section (WhatsApp-style) */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              key="chat"
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="lg:w-1/4 w-full bg-[#111B21] rounded-2xl shadow-xl border border-gray-700 flex flex-col overflow-hidden fixed lg:static right-0 top-0 lg:top-auto h-full lg:h-auto z-50"
            >
              <div className="flex justify-between items-center p-4 bg-[#202C33] border-b border-gray-700">
                <h3 className="text-green-400 font-semibold">
                  💬 Chat with Owner
                </h3>
                <button
                  onClick={() => setShowChat(false)}
                  className="text-gray-400 hover:text-red-500 text-lg transition"
                >
                  ✖
                </button>
              </div>

              <div className="flex-1 bg-[#0B141A] overflow-y-auto p-4">
                <ChatBox roomId={room._id} ownerId={room.owner._id} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RoomDetails;
