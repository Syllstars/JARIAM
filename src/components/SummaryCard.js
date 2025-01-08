import React from 'react';

const SummaryCard = ({ data }) => {
  const { title, value, description } = data;

  return (
    <div className="summary-card bg-white shadow-mb rounded p-4">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-2x1 font-semibold">{value}</p>
      <p className="text-gray-500">{description}</p>
    </div>
  );
};

export default SummaryCard;
