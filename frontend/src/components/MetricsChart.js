import {Chart as ChartJS, registerables} from 'chart.js';
import {Line} from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {es} from 'date-fns/locale';
ChartJS.register(...registerables);

import React from 'react';

export default function MetricsChart({data}) {
  const chartData = {
    datasets: [
      {
        label: 'Temperature',
        data:
          data && data.temperature ?
            data.temperature.map((d) => ({x: d.timestamp, y: d.average})) :
            [],
        borderColor: 'rgb(227, 46, 12)',
        backgroundColor: 'rgba(248, 126, 105, 0.85)',
        showLine: true,
      },
      {
        label: 'Voltage',
        data:
          data && data.voltage ?
            data.voltage.map((d) => ({x: d.timestamp, y: d.average})) :
            [],
        borderColor: 'rgba(232, 202, 12, 0.5)',
        backgroundColor: 'rgba(239, 219, 91, 0.85)',
        showLine: true,
      },
      {
        label: 'Humidity',
        data:
          data && data.humidity ?
            data.humidity.map((d) => ({x: d.timestamp, y: d.average})) :
            [],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.85)',
        showLine: true,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {display: true, text: 'Average'},
      },
      x: {
        adapters: {
          date: {locale: es},
          type: 'time',
          distribution: 'linear',
          time: {
            parser: 'yyyy-MM-ddThh:mm:ss',
            unit: 'second',
          },
          title: {
            display: true,
            text: 'Date',
          },
        },
      },
    },
  };

  return (
    <div>
      {data && (
        <Line
          options={options}
          data={chartData}
          style={{vh: 50}}
          datasetIdKey="id"
        />
      )}
    </div>
  );
}
