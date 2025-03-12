// src/components/BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../StoreAssets/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ data, chartType }) => {
    const chartData = {
        labels: data.labels, 
        datasets: [
            {
                label: chartType === 'price' ? 'Price' : 'Quantity',
                data: chartType === 'price' ? data.prices : data.quantities,
                backgroundColor: chartType === 'price' ? 'rgba(19, 231, 72, 0.6)' : 'rgba(54, 162, 235, 0.6)',
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
                text: chartType === 'price' ? 'Monthly Price Details' : 'Product Quantity Details',
            },
        },
    };

    return (
        <div className="bar-chart-container">
            <h2 className="bar-chart-title">{chartType === 'price' ? 'Daily Price Chart(Rs.)' : 'Product Volume Demand Chart(Kg.)'}</h2>
            <div className="chart">
                <Bar data={chartData} options={options} />
            </div>
        </div>
    );
};

export default BarChart;
