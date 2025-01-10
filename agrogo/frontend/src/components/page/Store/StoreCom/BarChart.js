// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../StoreAssets/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data }) => {
    const chartData = {
        labels: data.labels, // Assuming data has a 'day' property
        datasets: [
            {
                label: 'Price',
                data: data.prices, // Assuming data has a 'price' property
                backgroundColor: 'rgba(19, 231, 72, 0.6)',
                borderColor: 'rgb(19, 21, 21)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Monthly Price Details',
            },
        },
    };

    return (
        
        <div className="bar-chart-container">
            <h2 className="bar-chart-title">Monthly Price Chart</h2>
            <div className="chart">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;