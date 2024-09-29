<template>
    <div>
      <canvas ref="chartCanvas"></canvas>
    </div>
  </template>
  
  <script>
  import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController,
  } from 'chart.js';
  
  ChartJS.register(
    Title,
    Tooltip,
    Legend,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineController
  );
  
  export default {
    props: {
      voltageData: {
        type: Array,
        required: true,
        default: () => [], // Ensure a default empty array
      },
    },
    mounted() {
        if (this.voltageData && this.voltageData.length > 0) {
            this.renderChart();
        } else {
            console.warn('No voltage data available to render the chart.');
        }
    },
    methods: {
        getColorForTransformer(transformerName) {
            const colorMap = {
                'Transformer Alpha': '#FF5733',
                'Transformer Bravo': '#33FF57',
                'Transformer Charlie': '#3357FF',
                'Transformer Delta': '#FF33A1',
                'Transformer Echo': '#FFC300',
            };

            return colorMap[transformerName] || '#000000';
        },
        renderChart() {
        if (!Array.isArray(this.voltageData)) {
          console.error('voltageData is not an array:', this.voltageData);
          return;
        }
  
        const datasets = this.voltageData.map((transformer) => ({
            label: transformer.label,
            data: transformer.data.map((reading) => ({
                x: new Date(reading.x).toLocaleDateString(),
                y: reading.y,
            })),
            borderColor: this.getColorForTransformer(transformer.label),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: false,
            tension: 0.15,
        }));
  
        const ctx = this.$refs.chartCanvas.getContext('2d');
        
        new ChartJS(ctx, {
            type: 'line',
            data: {
                datasets: datasets,
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                        display: true,
                        text: 'Date',
                    },
                },
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Voltage',
                        },
                    },
                },
                plugins: {
                    legend: {
                    display: true,
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}V`;
                    },
                },
              },
            },
          },
        });
      },
    },
  };
  </script>
  
  <style scoped>
    canvas {
        width: 100%;
    }
  </style>
  