import React from 'react';
import SummaryCard from './SummaryCard';

const DashboardContent = () => {
  const cardsData = [
    { title: 'Utilisateurs', value: 120, description: 'Actifs ce mois'},
    { title: 'Projects', value: 34, description: 'En cours'},
    { title: 'Ventes', value: '$12.340', description: 'Ce mois-ci'},
  ];

  return (
    <div className="dashboard-content p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        { cardsData.map((card, index) => (
          <Summarycard key={index} data={card} />
        ))}
      </div>
    </div>
  );
};

export default DashboardContent;
