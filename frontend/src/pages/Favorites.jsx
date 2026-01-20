import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import Header from "../components/Header";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch Favorites
  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const res = await API.get("/users/favorites");
      setFavorites(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch favorites");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Remove Favorite
  const removeFavorite = async (roomId) => {
    try {
      await API.delete(`/users/favorites/${roomId}`);
      fetchFavorites();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove favorite");
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <Header />

      {/* Page Title */}
      <div className="text-center pt-10 pb-6">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
          💛 Your Favorite Rooms
        </h2>
        <p className="text-gray-400 mt-2">View and manage your saved rooms easily</p>
      </div>

      {/* Error */}
      {error && (
        <div className="text-red-400 text-center mb-4 animate-pulse bg-red-950/30 p-2 rounded-lg w-fit mx-auto">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center mt-20">
          <div className="w-12 h-12 border-4 border-yellow-400 border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6 pb-16">
          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-20 space-y-4">
              <div className="text-6xl animate-bounce">💔</div>
              <p className="text-gray-400 text-lg">You haven’t added any favorites yet.</p>
              <Link
                to="/home"
                className="mt-3 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300 hover:scale-105"
              >
                Explore Rooms
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {favorites.map((room) => (
                <div
                  key={room._id}
                  className="bg-gray-800/80 rounded-2xl shadow-lg overflow-hidden border border-gray-700 transform transition-all duration-300 hover:scale-[1.03] hover:shadow-yellow-500/20 hover:border-yellow-400"
                >
                  <div className="relative">
                    <img
                      src={room.images?.[0] || "https://via.placeholder.com/400x250?text=No+Image"}
                      alt={room.title}
                      className="w-full h-52 object-cover hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 rounded-full font-semibold">
                      ₹{room.rent}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col justify-between h-[220px]">
                    <div>
                      <h3 className="text-xl font-semibold text-yellow-300 mb-1 line-clamp-1">
                        {room.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                        {room.description}
                      </p>
                      <p className="text-gray-500 text-sm italic">
                        📍 {room.location}
                      </p>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      <Link
                        to={`/room/${room._id}`}
                        className="text-sm bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-4 py-1.5 rounded-lg font-semibold hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:-translate-y-1"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() => removeFavorite(room._id)}
                        className="text-sm bg-red-500/80 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1"
                      >
                        Remove ❤️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favorites;
