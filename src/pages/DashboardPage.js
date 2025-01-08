import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import DashboardContent from '../components/DashboardContent';

const DashboardPage = () => {
  return (
    <div className="dashboard-container flex">
      { /* Barre latéral */ }
      <Sidebar />
      { /*Contenu principal */ }
      <div className="main-content flex-1">
        <Header />
        <DashboardContent />
      </div>
    </div>
  );
};

export default DashboardPage;
