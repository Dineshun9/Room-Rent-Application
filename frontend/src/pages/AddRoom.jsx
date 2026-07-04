// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";

// const AddRoom = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     rent: "",
//     imageUrl: "",
//     description: "",
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   // ✅ Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       const roomData = {
//         title: formData.title.trim(),
//         description: formData.description.trim(),
//         location: formData.location.trim(),
//         rent: Number(formData.rent),
//         images: formData.imageUrl ? [formData.imageUrl.trim()] : [],
//       };

//       console.log(roomData);

//       const res = await API.post("/rooms", roomData);

//       if (res.status === 201) {
//         setSuccess("🎉 Room added successfully!");
//         setTimeout(() => navigate("/my-rooms"), 1200);
//       }
//     } catch (err) {
//       console.error("Add Room Error:", err);
//       setError(err.response?.data?.message || "Failed to add room. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
//       <div className="max-w-lg w-full bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
        
//         {/* Header */}
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
//           🏠 Add a New Room
//         </h2>

//         {/* Alert Messages */}
//         {error && (
//           <p className="text-red-400 text-center mb-4 animate-pulse bg-red-950/30 p-2 rounded-lg">
//             ❌ {error}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-400 text-center mb-4 animate-pulse bg-green-950/30 p-2 rounded-lg">
//             ✅ {success}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5">
//           {[
//             { label: "Room Title", name: "title", type: "text", placeholder: "e.g. Spacious Apartment" },
//             { label: "Location", name: "location", type: "text", placeholder: "e.g. Downtown, New York" },
//             { label: "Rent (per month)", name: "rent", type: "number", placeholder: "e.g. 1500" },
//             { label: "Image URL", name: "imageUrl", type: "text", placeholder: "Paste an image URL here" },
//           ].map((field, i) => (
//             <div key={i} className="transform transition-all hover:scale-[1.01]">
//               <label className="block mb-1 text-sm font-semibold text-yellow-300">{field.label}</label>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 placeholder={field.placeholder}
//                 value={formData[field.name]}
//                 onChange={handleChange}
//                 required={field.name !== "imageUrl"}
//                 className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//               />
//             </div>
//           ))}

//           {/* Image Preview */}
//           {formData.imageUrl && (
//             <div className="mt-3 animate-fade-in">
//               <img
//                 src={formData.imageUrl}
//                 alt="Room preview"
//                 className="rounded-xl shadow-md max-h-48 object-cover w-full border border-gray-700 hover:scale-105 transition-transform duration-500"
//               />
//             </div>
//           )}

//           {/* Description */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">Description</label>
//             <textarea
//               name="description"
//               placeholder="Describe your room..."
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             ></textarea>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-2.5 rounded-lg shadow-md hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
//           >
//             {loading ? "🚀 Adding Room..." : "Add Room"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddRoom;




// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";

// const AddRoom = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     location: "",
//     rent: "",
//     imageUrl: "",
//     description: "",
//   });

//   // ✅ NEW: image file state
//   const [imageFile, setImageFile] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const navigate = useNavigate();

//   // ✅ Handle text input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // ✅ NEW: handle image file change (for Cloudinary)
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setFormData({
//         ...formData,
//         imageUrl: URL.createObjectURL(file), // preview only
//       });
//     }
//   };

//   // ✅ Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       setLoading(true);
//       setError("");
//       setSuccess("");

//       // ✅ NEW: FormData for image upload
//       const roomData = new FormData();
//       roomData.append("title", formData.title.trim());
//       roomData.append("description", formData.description.trim());
//       roomData.append("location", formData.location.trim());
//       roomData.append("rent", Number(formData.rent));

//       if (imageFile) {
//         roomData.append("images", imageFile);
//       }
//       console.log(roomData);

//       const res = await API.post("/rooms", roomData);

//       if (res.status === 201) {
//         setSuccess("🎉 Room added successfully!");
//         setTimeout(() => navigate("/my-rooms"), 1200);
//       }
//     } catch (err) {
//       console.error("Add Room Error:", err);
//       setError(
//         err.response?.data?.message ||
//           "Failed to add room. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
//       <div className="max-w-lg w-full bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">
        
//         {/* Header */}
//         <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
//           🏠 Add a New Room
//         </h2>

//         {/* Alerts */}
//         {error && (
//           <p className="text-red-400 text-center mb-4 animate-pulse bg-red-950/30 p-2 rounded-lg">
//             ❌ {error}
//           </p>
//         )}
//         {success && (
//           <p className="text-green-400 text-center mb-4 animate-pulse bg-green-950/30 p-2 rounded-lg">
//             ✅ {success}
//           </p>
//         )}

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-5" encType="multipart/form-data">

//           {/* Title */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">
//               Room Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               placeholder="e.g. Spacious Apartment"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             />
//           </div>

//           {/* Location */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">
//               Location
//             </label>
//             <input
//               type="text"
//               name="location"
//               placeholder="e.g. Downtown, New York"
//               value={formData.location}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             />
//           </div>

//           {/* Rent */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">
//               Rent (per month)
//             </label>
//             <input
//               type="number"
//               name="rent"
//               placeholder="e.g. 1500"
//               value={formData.rent}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             />
//           </div>

//           {/* Image Upload */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">
//               Room Image
//             </label>
//             <input
//               type="file"
//               name="images"
//               onChange={handleImageChange}
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             />
//           </div>
        
//         {/* Description */}
//           <div className="transform transition-all hover:scale-[1.01]">
//             <label className="block mb-1 text-sm font-semibold text-yellow-300">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Describe your room..."
//               value={formData.description}
//               onChange={handleChange}
//               required
//               rows="4"
//               className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
//             ></textarea>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-2.5 rounded-lg shadow-md hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
//           >
//             {loading ? "🚀 Adding Room..." : "Add Room"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddRoom;





import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Header from "../components/Header";

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    imageUrl: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [useImageUrl, setUseImageUrl] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  // Text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // File input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setFormData({ ...formData, imageUrl: "" });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const roomData = new FormData();
      roomData.append("title", formData.title.trim());
      roomData.append("location", formData.location.trim());
      roomData.append("description", formData.description.trim());
      roomData.append("rent", Number(formData.rent));

      // ✅ Either image URL or file
      if (useImageUrl && formData.imageUrl.trim()) {
        roomData.append("imageUrl", formData.imageUrl.trim());
      }

      if (!useImageUrl && imageFile) {
        roomData.append("images", imageFile);
      }

      const res = await API.post("/rooms", roomData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201) {
        setSuccess("🎉 Room added successfully!");
        setTimeout(() => navigate("/my-rooms"), 1200);
      }
    } catch (err) {
      console.error("Add Room Error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to add room. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-10">
        <div className="max-w-lg w-full bg-gray-800/80 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-gray-700 transition-transform duration-500 hover:scale-[1.02]">

          {/* Header */}
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
            🏠 Add a New Room
          </h2>

          {/* Alerts */}
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

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-5"
            encType="multipart/form-data"
          >

            {/* Title */}
            <div className="transform transition-all hover:scale-[1.01]">
              <label className="block mb-1 text-sm font-semibold text-yellow-300">
                Room Title
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Spacious Apartment"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Location */}
            <div className="transform transition-all hover:scale-[1.01]">
              <label className="block mb-1 text-sm font-semibold text-yellow-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                placeholder="e.g. Downtown, New York"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Rent */}
            <div className="transform transition-all hover:scale-[1.01]">
              <label className="block mb-1 text-sm font-semibold text-yellow-300">
                Rent (per month)
              </label>
              <input
                type="number"
                name="rent"
                placeholder="e.g. 1500"
                value={formData.rent}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              />
            </div>

            {/* Image Choice */}
            <div className="flex gap-6 text-sm text-yellow-300">
              <label>
                <input
                  type="radio"
                  checked={useImageUrl}
                  onChange={() => setUseImageUrl(true)}
                />{" "}
                Image URL
              </label>

              <label>
                <input
                  type="radio"
                  checked={!useImageUrl}
                  onChange={() => setUseImageUrl(false)}
                />{" "}
                Upload Image
              </label>
            </div>

            {/* Image URL */}
            {useImageUrl && (
              <input
                type="text"
                name="imageUrl"
                placeholder="e.g. https://example.com/room.jpg"
                value={formData.imageUrl}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              />
            )}

            {/* Image Upload */}
            {!useImageUrl && (
              <input
                type="file"
                name="images"
                onChange={handleImageChange}
                className="w-full px-4 py-2 rounded-lg bg-gray-700/80 border border-gray-600 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all duration-300"
              />
            )}

            {/* Description */}
            <div className="transform transition-all hover:scale-[1.01]">
              <label className="block mb-1 text-sm font-semibold text-yellow-300">
                Description
              </label>
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold py-2.5 rounded-lg shadow-md hover:from-yellow-300 hover:to-orange-300 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              {loading ? "🚀 Adding Room..." : "Add Room"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddRoom;
