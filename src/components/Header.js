import React from 'react';

const Header = () => {
  return (
    <div className="header bg-white shadowmd p-4 flex justify-between items-center">
      <h1 className="text-x1 font-bold">Dashboard</h1>
      <div className="action flex items-center">
        <button className="mr-4">Notifications</button>
        <button>Profil</button>
      </div>
    </div>
  );
};

export dafault Header;
