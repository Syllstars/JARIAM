import React from "react";

const Users = () => {
  return (
    <div className="p-6">
      <h2 className="text-2x1 font-bold mb-4">Gestion des utilisateurs</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Nom</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th className="border border-gray-300 px-4 py-2">JARIAM</th>
            <th className="border border-gray-300 px-4 py-2">jariam@gmail.com</th>
            <th className="border border-gray-300 px-4 py-2">Actif</th>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Users;
