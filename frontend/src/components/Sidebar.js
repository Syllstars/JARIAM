import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen p-6">
      <h2 className="text-xl font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-4"><a href="/dashboard" className="hover:text-blue-400">Dashboard</a></li>
        <li className="mb-4"><a href="/profile" className="hover:text-blue-400">Profile</a></li>
        <li className="mb-4"><a href="/settings" className="hover:text-blue-400">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
