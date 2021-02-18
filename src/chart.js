import Chart from "chart.js"


const ctx = document.getElementById("myChart").getContext("2d");

const chart = new Chart(ctx, {
  type: "line",

  data: {
    datasets: [
      {
        label: "Heart Rate",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: [],
        fill: false,
      },
    ],
  },

  options: {
    scales: {
      xAxes: [
        {
          display: false,
        },
      ],
    },
    elements: {
      point: {
        radius: 1.5,
        hitRadius: 5,
        borderColor: "transparent",
        backgroundColor: "transparent",
      },
      line: {
        tension: 0,
      },
    },
  },
});

export const updateChart = (value) => {
  if (chart) {
    const time = `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;
    chart.data.labels.push(time);
    chart.data.datasets.forEach((dataset) => {
      dataset.data.push(value);
    });
    chart.update();
  }
};
