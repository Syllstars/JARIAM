import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { name: 'Accueil', path: '/' },
    { name: 'Utilisateurs', path: '/users' },
    { name: 'Statistiques', path: '/stats' },
    { name: 'paramètres', path: '/settings' }
  ];

  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-screen p-4">
      <h2 className="text-2x1 font-bold mb-6">Menu</h2>
      <ul>
        { menuItems.map((item, index) => (
          <li key={index} className="mb-4">
            <a href={item.path} className="hover:text-gray-400">
              { item.name}
            </a>
          </l>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
  
  
