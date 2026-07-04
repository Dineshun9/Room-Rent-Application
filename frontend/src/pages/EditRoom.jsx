import React, { useEffect, useState } from "react";
import { useNavigate, useParams  } from "react-router-dom";
import API from "../utils/api";
import Header from "../components/Header";

const EditRoom = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    description: "",
    imageUrl: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch existing room data
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        setLoading(true);
        const res = await API.get(`/rooms/${roomId}`);
        const room = res.data;

        setFormData({
          title: room.title || "",
          location: room.location || "",
          rent: room.rent || "",
          description: room.description || "",
          imageUrl: room.images?.[0] || "",
        });
      } catch (err) {
        console.error("Fetch Room Error:", err);
        setError(err.response?.data?.message || "Failed to fetch room data");
      } finally {
        setLoading(false);
      }
    };

    if (roomId) fetchRoom();
  }, [roomId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const roomData = {
        title: formData.title.trim(),
        location: formData.location.trim(),
        rent: Number(formData.rent),
        description: formData.description.trim(),
        images: formData.imageUrl ? [formData.imageUrl.trim()] : [],
      };

      const res = await API.put(`/rooms/${roomId}`, roomData); // PUT request to update
      if (res.status === 200) {
        setSuccess("🎉 Room updated successfully!");
        setTimeout(() => navigate("/my-rooms"), 1200);
      }
    } catch (err) {
      console.error("Update Room Error:", err);
      setError(err.response?.data?.message || "Failed to update room");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
        <div className="max-w-lg w-full bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            ✏️ Edit Room
          </h2>

          {error && (
            <p className="text-red-400 text-center mb-4 animate-pulse bg-red-950/30 p-2 rounded-lg">
              ❌ {error}
            </p>
          )}
          {success && (
            <p className="text-green-400 text-center mb-4 animate-pulse bg-green-950/30 p-2 rounded-lg">
              ✅ {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {[
              { label: "Room Title", name: "title", type: "text", placeholder: "e.g. Spacious Apartment" },
              { label: "Location", name: "location", type: "text", placeholder: "e.g. Downtown, New York" },
              { label: "Rent (per month)", name: "rent", type: "number", placeholder: "e.g. 1500" },
              { label: "Image URL", name: "imageUrl", type: "text", placeholder: "Paste an image URL here" },
            ].map((field, i) => (
              <div key={i} className="transform transition-all hover:scale-[1.01]">
                <label className="block mb-1 text-sm font-semibold text-yellow-300">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.name !== "imageUrl"}
                  className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
                />
              </div>
            ))}

            {formData.imageUrl && (
              <div className="mt-3 animate-fade-in">
                <img
                  src={formData.imageUrl}
                  alt="Room preview"
                  className="rounded-xl shadow-md max-h-48 object-cover w-full border border-gray-700 hover:scale-105 transition-transform duration-500"
                />
              </div>
            )}

            <div className="transform transition-all hover:scale-[1.01]">
              <label className="block mb-1 text-sm font-semibold text-yellow-300">Description</label>
              <textarea
                name="description"
                placeholder="Describe your room..."
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-2.5 rounded-lg shadow-md hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              {loading ? "🚀 Updating Room..." : "Update Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditRoom;
