import React from 'react';
import Widget from '../components/Widget';
import Chart from '../components/Chart';

const Dashboard = () => {
  return (
    <div className="p-6">
      <h2 className="text-2x1 font-bold mb-4">Vue d'ensemble</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Widget title="Utilisateur actifs" value="123" />
        <Widget title="Requêtes aujourd'hui" value="2,345" />
        <Widget title="Incidents détectés" value="5" />
      </div>
      <div className="bg-white shadow rounded p-4">
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
