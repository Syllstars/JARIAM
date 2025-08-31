import React from "react";

const Navbar = ({ user, onLogout, onToggleSidebar }) => {
  return (
    <nav className="navbar">
      <button onClick={onToggleSidebar} className="text-white mr-4">☰</button>
      <h1 className="logo">JARIAM</h1>
      <div className="nav-links">
        {user && <span className="user-info">{user.first_name}</span>}
        <button className="nav-button" onClick={onLogout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
