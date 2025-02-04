import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi"],
  datasets: [
    {
      label: "Requêtes par jour",
      data: [120, 190, 300, 500, 200],
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
    },
    ],
};

const Chart = () => {
  return <Line data={data} />
    };

export default Chart;
