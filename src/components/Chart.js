import React from "react";
import { Line } from "react-chartjs-2";

import "./Chart.css";

const Chart = ({ titleDetails, color: { r, g, b } }) => {
  const bgColor = `rgb(${r}, ${g}, ${b}, 0.7)`;
  const borderColor = `rgb(${r}, ${g}, ${b}, 1)`;
  return (
    <div className="chart">
      <Line
        width={800}
        height={400}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: "Series Rating Progression",
          },
          legend: {
            display: false,
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "IMDB Rating",
                },
              },
            ],
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                return "IMDB Rating: " + tooltipItem.value;
              },
              title: function (tooltipItem) {
                const index = parseFloat(tooltipItem[0].index);

                return titleDetails.episodes[index].Title;
              },
            },
          },
        }}
        data={{
          labels: titleDetails.episodes.map((episode) => episode.episodeNumber),
          datasets: [
            {
              label: "IMDB Ratings",
              data: titleDetails.episodes.map((episode) => episode.imdbRating),
              borderColor: borderColor,
              backgroundColor: bgColor,
              fill: true,
            },
          ],
        }}
      />
    </div>
  );
};

export default Chart;
