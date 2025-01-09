import React from "react";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white p-6">
      <h2 className="text-x1 font-bold mb-6">Menu</h2>
      <ul>
        <li className="mb-4">
          <Link to="/" className="hover:text-blue-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:text-blue-400">Utilisateurs</Link>
        </li>
        <li className="mb-4">
          <Link to="/logs" className="hover:text-blue-400">Logs & Audits</Link>
        </li>
        <li className="mb-4">
          <Link to="/security" className="hover:text-blue-400">Sécurité</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="hover:text-blue-400">Paramètres</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
