import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

const options = {
  scales: {
    yAxes: [
      {
        type: 'linear',
        display: true,
        position: 'left',
        id: 'y-axis-1',
      },
      {
        type: 'linear',
        display: true,
        position: 'right',
        id: 'y-axis-2',
        gridLines: {
          drawOnArea: false,
        },
      },
    ],
  },
};

const LineBar = ({ data, results, selected }) => {
  const memoizeBarData = useMemo(() => {
    const transformData = data.map(x => parseFloat(Number(x[selected])));
    const transformPrediction = results.map(x => x['prediction']);

    const barData = {
      labels: [...Array(data.length).keys()],
      datasets: [
        {
          label: 'Actual',
          data: transformData,
          fill: false,
          backgroundColor: 'rgb(255, 99, 132)',
          borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
          label: 'Prediction',
          data: transformPrediction,
          fill: false,
          backgroundColor: 'rgb(54, 162, 235)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
        },
      ],
    }
    return barData;
  }, [data, results, selected])

  return (
    <Line data={memoizeBarData} options={options} />
  )
}

export default LineBar;