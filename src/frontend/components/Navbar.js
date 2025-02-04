import React from "react";

const Navbar = () => {
  return (
    <div className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2x1 font-bold text-gray-800">Mon Dashboard</h1>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-md">Déconnexion</button>
    </div>
  );
};

export default Navbar;
