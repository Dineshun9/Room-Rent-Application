// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import API from "../utils/api";
// import Header from "../components/Header";
// import ProfileSidebar from "./ProfileSidebar";

// const Home = () => {
//   const [rooms, setRooms] = useState([]);

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await API.get("/rooms");
//         setRooms(res.data);
//       } catch (err) {
//         console.error("Error fetching rooms:", err);
//       }
//     };
//     fetchRooms();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">    
//         <Header />
        
//       {/* Hero Section */}
//       <section className="text-center py-12">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl sm:text-5xl font-bold text-yellow-400"
//         >
//           Discover Your Perfect Room 🏠
//         </motion.h1>
//         <p className="text-gray-400 mt-3 text-lg">
//           Find, rent, and live comfortably — all in one place with{" "}
//           <span className="text-yellow-400 font-semibold">RoomEase</span>.
//         </p>
//       </section>

//       {/* Room Cards Section */}
//       <div className="px-6 sm:px-10 lg:px-16 pb-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {rooms.length === 0 ? (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center col-span-full text-gray-400"
//           >
//             No rooms available at the moment 💤
//           </motion.p>
//         ) : (
//           rooms.map((room, index) => (
//             <motion.div
//               key={room._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-yellow-500/30 transition duration-300 hover:scale-105 flex flex-col"
//             >
//               {/* Room Image */}
//               <div className="h-48 w-full overflow-hidden">
//                 <img
//                   src={
//                     room.image ||
//                     "https://images.unsplash.com/photo-1560184897-64cfa3b5c1c4?auto=format&fit=crop&w=800&q=60"
//                   }
//                   alt={room.title}
//                   className="h-full w-full object-cover hover:scale-110 transition duration-300"
//                 />
//               </div>

//               {/* Room Info */}
//               <div className="p-5 flex flex-col flex-grow justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold text-yellow-400 mb-2">
//                     {room.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm mb-2 line-clamp-2">
//                     {room.description}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     📍 <span className="text-white">{room.location}</span>
//                   </p>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                   <p className="text-yellow-400 font-bold text-lg">
//                     ₹{room.rent}
//                   </p>
//                   <Link
//                     to={`/room/${room._id}`}
//                     className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition duration-200"
//                   >
//                     View Details
//                   </Link>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;






// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import API from "../utils/api";
// import Header from "../components/Header";

// const Home = () => {
//   const [rooms, setRooms] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchRooms = async () => {
//       try {
//         const res = await API.get("/rooms");
//         setRooms(res.data);
//       } catch (err) {
//         console.error("Error fetching rooms:", err);
//       }
//     };
//     fetchRooms();
//   }, []);

//   const handleRoomClick = (roomId) => {
//     navigate(`/room/${roomId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">
//       <Header />

//       {/* Hero Section */}
//       <section className="text-center py-12">
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           className="text-4xl sm:text-5xl font-bold text-yellow-400"
//         >
//           Discover Your Perfect Room 🏠
//         </motion.h1>
//         <p className="text-gray-400 mt-3 text-lg">
//           Find, rent, and live comfortably — all in one place with{" "}
//           <span className="text-yellow-400 font-semibold">RoomEase</span>.
//         </p>
//       </section>

//       {/* Room Cards */}
//       <div className="px-6 sm:px-10 lg:px-16 pb-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//         {rooms.length === 0 ? (
//           <motion.p
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             className="text-center col-span-full text-gray-400"
//           >
//             No rooms available at the moment 💤
//           </motion.p>
//         ) : (
//           rooms.map((room, index) => (
//             <motion.div
//               key={room._id}
//               initial={{ opacity: 0, y: 40 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.4, delay: index * 0.1 }}
//               onClick={() => handleRoomClick(room._id)}
//               className="cursor-pointer bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
//                          hover:shadow-yellow-500/30 transition duration-300 
//                          hover:scale-105 flex flex-col"
//             >
//               {/* Image */}
//               <div className="h-48 w-full overflow-hidden">
//                 <img
//                   src={
//                      room.images && room.images.length > 0 && room.images[0]
//                       ? room.images[0]
//                       : "https://media.istockphoto.com/id/185083188/photo/luxury-shangri-la-hotel-room.jpg?s=1024x1024&w=is&k=20&c=c07mcS7zJ9-cPEjRS4JE-qGPymHSAoU-DNBsa8wmA8E="
//                     }
                    
//                   alt={room.title}
//                   className="h-full w-full object-cover hover:scale-110 transition duration-300"
//                 />
//               </div>

//               {/* Info */}
//               <div className="p-5 flex flex-col flex-grow justify-between">
//                 <div>
//                   <h3 className="text-xl font-semibold text-yellow-400 mb-2">
//                     {room.title}
//                   </h3>
//                   <p className="text-gray-300 text-sm mb-2 line-clamp-2">
//                     {room.description}
//                   </p>
//                   <p className="text-gray-400 text-sm">
//                     📍 <span className="text-white">{room.location}</span>
//                   </p>
//                 </div>

//                 <div className="mt-4 flex items-center justify-between">
//                   <p className="text-yellow-400 font-bold text-lg">
//                     ₹{room.rent}
//                   </p>

//                   {/* Visual indicator only */}
//                   <span  className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-4 py-2 rounded-full transition duration-200">
//                     Click to view →
//                   </span>
//                 </div>
//               </div>
//             </motion.div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;







import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API from "../utils/api";
import Header from "../components/Header";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  // ✅ NEW: search handler
  const handleSearch = async (searchValue) => {
    try {
      if (!searchValue.trim()) {
        // If search empty → load all rooms again
        const res = await API.get("/rooms");
        setRooms(res.data);
        return;
      }

      const res = await API.get(`/rooms?location=${searchValue}`);
      setRooms(res.data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await API.get("/rooms");
        setRooms(res.data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
      }
    };
    fetchRooms();
  }, []);

  const handleRoomClick = (roomId) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white flex flex-col">

      {/* ✅ UPDATED: pass search handler */}
      <Header onSearch={handleSearch} />
     


      {/* Hero Section */}
      <section className="text-center py-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-5xl font-bold text-yellow-400"
        >
          Discover Your Perfect Room 🏠
        </motion.h1>
        <p className="text-gray-400 mt-3 text-lg">
          Find, rent, and live comfortably — all in one place with{" "}
          <span className="text-yellow-400 font-semibold">RoomEase</span>.
        </p>
      </section>

      {/* Room Cards */}
      <div className="px-6 sm:px-10 lg:px-16 pb-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center col-span-full text-gray-400"
          >
            No rooms available at the moment 💤
          </motion.p>
        ) : (
          rooms.map((room, index) => (
            <motion.div
              key={room._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => handleRoomClick(room._id)}
              className="cursor-pointer bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                         hover:shadow-yellow-500/30 transition duration-300 
                         hover:scale-105 flex flex-col"
            >
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={
                    room.images && room.images.length > 0 && room.images[0]
                      ? room.images[0]
                      : "https://media.istockphoto.com/id/185083188/photo/luxury-shangri-la-hotel-room.jpg"
                  }
                  alt={room.title}
                  className="h-full w-full object-cover hover:scale-110 transition duration-300"
                />
              </div>

              <div className="p-5 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-yellow-400 mb-2">
                    {room.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                    {room.description}
                  </p>
                  <p className="text-gray-400 text-sm">
                    📍 <span className="text-white">{room.location}</span>
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-yellow-400 font-bold text-lg">
                    ₹{room.rent}
                  </p>
                  <span className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded-full">
                    Click to view →
                  </span>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
