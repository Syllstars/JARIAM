import React from "react";

const Widget = ({ title, value }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-gray-600">{title}</h3>
      <p className="text-2x1 font-bold">{value}</p>
    </div>
  );
};

export default Widget;
