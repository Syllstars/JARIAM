import React from "react";
import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaCog } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <nav className="flex flex-col gap-6">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
            }`
          }
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>

        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
            }`
          }
        >
          <FaUser /> Profile
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 text-lg transition-colors ${isActive ? "text-blue-400 font-semibold" : "hover:text-blue-300"
            }`
          }
        >
          <FaCog /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
