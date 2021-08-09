import React, { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';

const options = {
  aspectRatio: 0.8,
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: 'top'
  },
};

const HorizontalBar = ({ data }) => {
  const memoizeBarData = useMemo(() => {
    const orderedFeatureImportance = Object.entries(data).sort((x, y) => y[1] - x[1]);
    const transformLabels = orderedFeatureImportance.map(x => x[0]);
    const transformValues = orderedFeatureImportance.map(x => x[1]);

    const barData = {
      labels: transformLabels,
      datasets: [
        {
          label: 'features',
          data: transformValues,
          backgroundColor: 'rgba(75, 192, 192, 1)',
        },
      ],
    }
    
    return barData;
  }, [data])

  return (
    <Bar data={memoizeBarData} options={options} />
  )
}

export default HorizontalBar;