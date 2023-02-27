import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

const ChartComponent = () => {
  const [status, setStatus] = useState(0);

  const data = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Events",
        data: [12, 18, 9, 20, 16, 24],
        fill: false,
        borderColor: "#4BC0C0",
        backgroundColor: "#4BC0C0",
        pointBorderColor: "#4BC0C0",
        pointBackgroundColor: "#4BC0C0",
        pointHoverBackgroundColor: "#4BC0C0",
        pointHoverBorderColor: "#4BC0C0",
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Events by Month",
        font: {
          size: 18,
          color: "#fff", // change title text color to white
        },
      },
    },
    scales: {
      x: {
        type: "category",
        labels: ["January", "February", "March", "April", "May", "June"],
        ticks: {
          font: {
            color: "white", // change x-axis labels text color to white
          },
        },
      },
      y: {
        min: 0,
        ticks: {
          font: {
            color: "white", // change x-axis labels text color to white
          },
        },
      },
    },
  };

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

  return (
    <div className="z-50 bg-gray-100 bg-opacity-10 w-full md:w-2/3 rounded-xl">
      <div className="w-full h-12 bg-white rounded-t-xl  items-center flex justify-between my-4">
        <div
          onClick={() => setStatus(0)}
          className={
            status === 0
              ? " h-full w-1/3 rounded-tl-xl ext-center bg-indigo-600 text-white flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white "
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white"
          }
        >
          Projects{" "}
        </div>
        <div
          onClick={() => setStatus(1)}
          className={
            status === 1
              ? " h-full w-1/3  text-center bg-indigo-600 text-white flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white "
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white"
          }
        >
          Leads{" "}
        </div>
        <div
          onClick={() => setStatus(2)}
          className={
            status === 2
              ? " h-full w-1/3 rounded-tr-xl ext-center bg-indigo-600 text-white flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white "
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center hover:rounded-t-xl cursor-pointer hover:bg-indigo-300 hover:text-white"
          }
        >
          Revenue{" "}
        </div>
      </div>
      <Line data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
