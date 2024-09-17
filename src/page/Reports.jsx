import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "2023 Revenue",
      data: [300, 400, 350, 500, 700, 650, 800, 750, 900, 850, 950, 1000],
      borderColor: "rgba(75,192,192,1)",
      backgroundColor: "rgba(75,192,192,0.2)",
      fill: true,
    },
    {
      label: "2024 Revenue",
      data: [320, 420, 370, 520, 740, 1000, 830, 790, 930, 880, 970, 1050],
      borderColor: "rgba(255,99,132,1)",
      backgroundColor: "rgba(255,99,132,0.2)",
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Monthly Revenue",
    },
    tooltip: {
      enabled: true,
      callbacks: {
        title: function (tooltipItems) {
          return tooltipItems[0].label;
        },
        label: function (tooltipItem) {
          return "Revenue: $" + tooltipItem.formattedValue;
        },
      },
      position: "nearest",
      yAlign: "bottom",
      xAlign: "center",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      titleColor: "#fff",
      bodyColor: "#fff",
      titleFont: {
        size: 16,
        weight: "bold",
      },
      bodyFont: {
        size: 14,
      },
      padding: 10,
      borderWidth: 1,
      cornerRadius: 8,
    },
  },
  scales: {
    x: {
      grid: {
        display: true, // Hides the vertical grid lines
      },
    },
    y: {
      grid: {
        display: true, // Hides the horizontal grid lines
      },
      beginAtZero: true,
    },
  },
};

function Reports() {
  const [currentTab, setCurrentTab] = useState("Order History");

  return (
    <div className="w-full h-full bg-culture-white rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex items-center justify-center gap-4 shadow px-3 py-2 rounded-lg">
        <p className="font-semibold">Select a date range</p>
        <input type="date" className="px-3 py-1 rounded-md" />
        <input type="date" className="px-3 py-1 rounded-md" />
      </div>
      <div className="w-full h-full flex gap-2">
        <div className="flex-1 bg-linen rounded shadow">
          <Line data={data} options={options} />
        </div>

        {/* Chart */}
        <div className="flex-1 bg-linen rounded shadow">12</div>
      </div>
    </div>
  );
}

export default Reports;
