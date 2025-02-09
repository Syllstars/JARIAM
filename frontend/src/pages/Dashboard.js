import React from "react";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Dashboard</h2>
        <ul>
          <li className="mt-4">Overview</li>
          <li className="mt-4">Projects</li>
          <li className="mt-4">Settings</li>
        </ul>
      </aside>
      <main className="flex-1 p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome to JARIAM</h1>
      </main>
    </div>
  );
};

export default Dashboard;
