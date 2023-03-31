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

const ChartComponent = ({ details }) => {
  const [status, setStatus] = useState(0);

  const data = {
    datasets: [
      {
        label: "Events",
        data:
          status === 0
            ? details?.projects?.map((lead, index) => lead.count)
            : status === 1
            ? details?.leads?.map((lead, index) => lead.count)
            : details?.projects?.map((lead, index) => lead.count),
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
    options: {
      tooltips: {
        callbacks: {
          title: function (t, d) {
            return moment(d.labels[t[0].index]).format("dd MMM DD, YYYY");
          },
          label: function (t, d) {
            const label = d.datasets[t.datasetIndex].label;
            const value = d.datasets[t.datasetIndex].data[t.index];
            const sign = value >= 0 ? "+" : "";
            return `${label}: ${sign}${value.toFixed(2)}%`;
          },
        },
        backgroundColor: "#FAFAFA",
        borderColor: "lightgreen",
        borderWidth: 1,
        titleFontColor: "black",
        titleFontStyle: "bold",
        displayColors: false,
        bodyFontColor: "black",
      },
    },
    hover: {
      mode: "nearest",
      intersect: true,
    },
    scales: {
      x: {
        type: "category",
        labels: details?.projects?.map((lead, index) => lead.month),
        ticks: {
          font: {
            color: "white", // change x-axis labels text color to white
          },
        },
      },
      y: {
        min: 0,
        labels: [0, 2, 4, 6, 8, 10, 12, 14],
        ticks: {
          font: {
            color: "white", // change x-axis labels text color to white
          },
        },
      },
    },
  };

  Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title);

  console.log("7648746846847", details);

  return (
    <div className="z-50 bg-gray-100 bg-opacity-10 w-full rounded-xl">
      <div className="w-full h-12 bg-white rounded-t-xl  items-center flex justify-between my-4">
        <div
          onClick={() => setStatus(0)}
          className={
            status === 0
              ? " h-full w-1/3 rounded-tl-xl ext-center bg-indigo-600 text-white flex items-center justify-center"
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center hover:rounded-tl-xl cursor-pointer hover:bg-indigo-300 hover:text-white"
          }
        >
          Projects{" "}
        </div>
        <div
          onClick={() => setStatus(1)}
          className={
            status === 1
              ? " h-full w-1/3  text-center bg-indigo-600 text-white flex items-center justify-center"
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center cursor-pointer hover:bg-indigo-300 hover:text-white"
          }
        >
          Leads{" "}
        </div>
        <div
          onClick={() => setStatus(2)}
          className={
            status === 2
              ? " h-full w-1/3 rounded-tr-xl ext-center bg-indigo-600 text-white flex items-center justify-center"
              : "text-gray-700 h-full w-1/3 text-center flex items-center justify-center hover:rounded-tr-xl cursor-pointer hover:bg-indigo-300 hover:text-white"
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
