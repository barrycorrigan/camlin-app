<template>
  <div>
    <!-- Canvas element for the chart -->
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

  // Register required Chart.js components
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
        default: () => [],
      },
    },
    mounted() {
      // Check if voltage data exists, then render chart
      if (this.voltageData && this.voltageData.length > 0) {
        this.renderChart();
      } else {
        console.warn('No voltage data available to render the chart.');
      }
    },
    methods: {
      // Method to get color based on transformer name
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
        // Check if voltageData is a valid array
        if (!Array.isArray(this.voltageData)) {
          console.error('voltageData is not an array:', this.voltageData);
          return;
        }

        // Map voltage data to Chart.js datasets
        const datasets = this.voltageData.map((transformer) => ({
          label: transformer.label,
          data: transformer.data.map((reading) => ({
            x: new Date(reading.x).toLocaleDateString(), // Convert date to string
            y: reading.y, // Voltage value
          })),
          borderColor: this.getColorForTransformer(transformer.label),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
          tension: 0.15,
        }));

        // Get the canvas context for rendering
        const ctx = this.$refs.chartCanvas.getContext('2d');

        // Create a new Chart.js instance with the configured data and options
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
                  // Custom tooltip to display voltage in volts
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
