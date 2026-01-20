import React from "react";
import { Link } from "react-router-dom";
import ProfileSidebar from "../pages/ProfileSidebar";

const Header = () => {
  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-3 flex items-center justify-between relative">
  <div className="flex items-center ">
    <ProfileSidebar/>
  </div>

  <div className="flex items-center ">
    <Link to="#" className="text-2xl font-bold text-yellow-400">
      RoomEase 🏠
    </Link>
  </div>
   </nav>

  );
};

export default Header;
