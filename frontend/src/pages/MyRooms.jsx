// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../utils/api";

// const MyRooms = () => {
//   const [rooms, setRooms] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   const fetchRooms = async () => {
//     try {
//       setLoading(true);
//       setError("");
//       const res = await API.get("/rooms/my-rooms");
//       setRooms(res.data);
//     } catch (err) {
//       console.error(err);
//       if (err.response?.status === 401) {
//         setError("Unauthorized. Please login again.");
//         localStorage.clear();
//         navigate("/login");
//       } else {
//         setError("Failed to load your rooms. Please try again later.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (token) fetchRooms();
//     else navigate("/login");
//   }, [token, navigate]);

//   const handleDelete = async (roomId) => {
//     if (!window.confirm("Are you sure you want to delete this room?")) return;

//     try {
//       await API.delete(`/rooms/${roomId}`);
//       setRooms((prev) => prev.filter((room) => room._id !== roomId));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete room. Try again.");
//     }
//   };

//   const handleEdit = (roomId) => navigate(`/add-room?id=${roomId}`);

//   const handleViewDetails = (roomId) => {
//     navigate(`/room/${roomId}`);
//   };


//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-500"></div>
//       </div>
//     );

//   if (error)
//     return (
//       <div className="text-center mt-10 text-red-500 text-lg font-medium">
//         {error}
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-gray-100">
//       {/* Header */}
//       <div className="max-w-6xl mx-auto px-6 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-md">
//             🏠 My Listed Rooms
//           </h1>
//           <button
//             onClick={() => navigate("/add-room")}
//             className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow-lg hover:shadow-yellow-400/50 transition"
//           >
//             + Add New Room
//           </button>
//         </div>

//         {/* Empty State */}
//         {rooms.length === 0 ? (
//           <div className="flex flex-col items-center justify-center mt-28 text-center">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
//               alt="No rooms"
//               className="w-44 h-44 opacity-90 mb-6 drop-shadow-lg"
//             />
//             <h2 className="text-2xl font-semibold text-gray-300 mb-2">
//               You haven’t listed any rooms yet!
//             </h2>
//             <p className="text-gray-400 mb-6">
//               Start by adding your first room to attract tenants.
//             </p>
//             <button
//               onClick={() => navigate("/add-room")}
//               className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold transition shadow-lg hover:shadow-yellow-400/40"
//             >
//               Add Room Now
//             </button>
//           </div>
//         ) : (
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {rooms.map((room) => (
//               <div
//                 key={room._id}
//                 className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 transform hover:-translate-y-1 transition-all duration-300"
//               >
//                 <img
//                   src={room.images?.[0] || "https://via.placeholder.com/300x200"}
//                   alt={room.title}
//                   className="w-full h-44 object-cover rounded-t-2xl"
//                 />
//                 <div className="p-5">
//                   <h3 className="text-xl font-bold text-yellow-400 mb-1">
//                     {room.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm mb-2">{room.location}</p>
//                   <p className="text-yellow-300 font-semibold text-lg mb-3">
//                     ₹{room.rent.toLocaleString("en-IN")}/month
//                   </p>

//                   <p className="text-gray-400 text-sm line-clamp-2 mb-4">
//                     {room.description || "No description provided."}
//                   </p>

//                   <div className="flex justify-between gap-2">
//                     <button
//                       onClick={() => handleViewDetails(room._id)}
//                       className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-1.5 rounded-md transition w-full"
//                     >
//                       👁 View Details
//                     </button>

//                     <button
//                       onClick={() => handleEdit(room._id)}
//                       className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md transition w-full"
//                     >
//                       ✏️ Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(room._id)}
//                       className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-md transition w-full"
//                     >
//                       🗑 Delete
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default MyRooms;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";
import Header from "../components/Header";

const MyRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // ---------------- FETCH ROOMS ----------------
  const fetchRooms = async () => {
    try {
      setLoading(true);
      setError("");
      const res = await API.get("/rooms/my-rooms");
      setRooms(res.data);
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
        localStorage.clear();
        navigate("/login");
      } else {
        setError("Failed to load your rooms. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchRooms();
    else navigate("/login");
  }, [token, navigate]);

  // ---------------- ACTION HANDLERS ----------------
  const handleDelete = async (roomId) => {

    console.log("Deleting room:");

    if (!window.confirm("Are you sure you want to delete this room?")) return;

    console.log("Deleting room:");

    try {
  const res = await API.delete(`/rooms/${roomId}`);
  console.log("Delete response:", res.data);
  setRooms((prev) => prev.filter((room) => room._id !== roomId));
} catch (err) {
  console.error("Delete Error:", err.response || err.message);
  alert("Failed to delete room. Try again.");
}

  };

  const handleEdit = (roomId) => navigate(`/Edit-Room/${roomId}`);
  const handleViewDetails = (roomId) => navigate(`/room/${roomId}`);

  // Prevent card click when clicking buttons
  const stopPropagation = (e) => e.stopPropagation();

  // ---------------- UI STATES ----------------
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[80vh] bg-gradient-to-b from-gray-900 via-gray-800 to-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-yellow-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500 text-lg font-medium">
        {error}
      </div>
    );
  }

  // ---------------- MAIN UI ----------------
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-10">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-extrabold text-yellow-400 drop-shadow-md">
              🏠 My Listed Rooms
            </h1>
            <button
              onClick={() => navigate("/add-room")}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg font-semibold shadow-lg transition"
            >
              + Add New Room
            </button>
          </div>

          {/* Empty State */}
          {rooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-28 text-center">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076504.png"
                alt="No rooms"
                className="w-44 h-44 opacity-90 mb-6"
              />
              <h2 className="text-2xl font-semibold text-gray-300 mb-2">
                You haven’t listed any rooms yet!
              </h2>
              <p className="text-gray-400 mb-6">
                Start by adding your first room to attract tenants.
              </p>
              <button
                onClick={() => navigate("/add-room")}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2 rounded-lg font-semibold transition"
              >
                Add Room Now
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {rooms.map((room) => (
                <div
                  key={room._id}
                  onClick={() => handleViewDetails(room._id)}
                  className="cursor-pointer bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-400/20 hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Image */}
                  <img
                    src={room.images?.[0] }
                    alt={room.title}
                    className="w-full h-44 object-cover rounded-t-2xl"
                  />

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-yellow-400 mb-1">
                      {room.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-2">
                      {room.location}
                    </p>
                    <p className="text-yellow-300 font-semibold text-lg mb-3">
                      ₹{room.rent.toLocaleString("en-IN")}/month
                    </p>

                    <p className="text-gray-400 text-sm line-clamp-2 mb-4">
                      {room.description || "No description provided."}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                      <button
                        onClick={(e) => {
                          stopPropagation(e);
                          handleEdit(room._id);
                        }}
                        className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-1.5 rounded-md transition w-full"
                      >
                        ✏️ Edit
                      </button>

                      <button
                        onClick={(e) => {
                          console.log("Delete button clicked");
                          stopPropagation(e);
                          handleDelete(room._id);
                        }}
                        className="bg-red-600 hover:bg-red-500 text-white px-4 py-1.5 rounded-md transition w-full"
                      >
                        🗑 Delete
                      </button>
                       {/* ✅ NEW */}
  <button
    onClick={(e) => {
      stopPropagation(e);
      navigate(`/chat/${room._id}`);
    }}
    className="bg-green-600 hover:bg-green-500 text-white px-4 py-1.5 rounded-md transition w-full"
  >
    💬 View Chats
  </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyRooms;


