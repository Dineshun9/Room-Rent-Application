// import React from "react";
// import { Link } from "react-router-dom";
// import ProfileSidebar from "../pages/ProfileSidebar";

// const Header = () => {
//   return (
//     <nav className="bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-between relative">
//   <div className="flex items-center ">
//     <ProfileSidebar/>
//   </div>

//   <div className="flex items-center ">
//     <Link to="#" className="text-2xl font-bold text-yellow-400">
//       RoomEase 🏠
//     </Link>
//   </div>
//    </nav>

//   );
// };

// export default Header;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import ProfileSidebar from "../pages/ProfileSidebar";

// const Header = ({ onSearch, onFilter }) => {
//   const [search, setSearch] = useState("");
  

//   return (
//     <nav className="bg-gray-900 text-white shadow-md px-12 py-6 flex items-center justify-between relative">

//       {/* Left */}
//       <div className="flex items-center gap-4">
//         <ProfileSidebar />
//       </div>

//       {/* Left-Middle (Search ) */}
//       {/* <div className="absolute left-1/4 transform -translate-x-1/2 flex items-center gap-2">
//         <input
//           type="text"
//           value={search}
//           onChange={(e) => setSearch(e.target.value)}
//           placeholder="Search rooms..."
//           className="w-64 px-4 py-2 rounded-full bg-gray-800 text-sm text-white
//                     placeholder-gray-400 border border-gray-700
//                     focus:outline-none focus:ring-2 focus:ring-yellow-400
//                     hover:border-yellow-400
//                     transition-all duration-300"
//         />

//         <button
//           onClick={() => onSearch(search)}
//           className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900
//                     text-sm font-semibold
//                     hover:bg-yellow-500 hover:scale-105
//                     active:scale-95
//                     transition-all duration-300 shadow-md"
//         >
//           Search
//         </button>
//       </div> */}


//       {/* Center Title */}
//       <div className="flex items-center">
//         <Link to="#" className="text-2xl font-bold text-yellow-400">
//           RoomEase 🏠
//         </Link>
//       </div>

//     </nav>
//   );
// };

// export default Header;









import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../pages/ProfileSidebar";

const Header = ({ onSearch }) => {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (!search.trim()) return;
    onSearch(search.trim());
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-12 py-6 flex items-center justify-between relative">

      {/* Left */}
      <div className="flex items-center gap-4">
        <ProfileSidebar />
      </div>

      {/* Search */}
      <div className="absolute left-1/4 transform -translate-x-1/2 flex items-center gap-2">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by location..."
          className="w-64 px-4 py-2 rounded-full bg-gray-800 text-sm text-white
                     placeholder-gray-400 border border-gray-700
                     focus:outline-none focus:ring-2 focus:ring-yellow-400
                     hover:border-yellow-400
                     transition-all duration-300"
        />

        <button
          onClick={handleSearch}
          className="px-5 py-2 rounded-full bg-yellow-400 text-gray-900
                     text-sm font-semibold
                     hover:bg-yellow-500 hover:scale-105
                     active:scale-95
                     transition-all duration-300 shadow-md"
        >
          Search
        </button>
      </div>

      {/* Center Title */}
      <div className="flex items-center">
        <Link to="#" className="text-2xl font-bold text-yellow-400">
          RoomEase 🏠
        </Link>
      </div>
    </nav>
  );
};

export default Header;
