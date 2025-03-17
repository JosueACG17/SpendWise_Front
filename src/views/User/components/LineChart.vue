<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import Chart from 'chart.js/auto';
import type { ChartData, ChartOptions } from 'chart.js';

interface ChartDataset {
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string;
  borderWidth?: number;
  label?: string;
  tension?: number;
  fill?: boolean;
}

interface ChartProps {
  chartData: {
    labels: string[];
    datasets: ChartDataset[];
  }
}

const props = defineProps<ChartProps>();

const chartCanvas = ref<HTMLCanvasElement | null>(null);
let chart: Chart | null = null;

onMounted(() => {
  if (chartCanvas.value) {
    createChart();
  }
});

watch(() => props.chartData, (newData) => {
  if (chart) {
    chart.data = newData as ChartData;
    chart.update();
  }
}, { deep: true });

const createChart = (): void => {
  if (!chartCanvas.value) return;

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)'
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  chart = new Chart(chartCanvas.value, {
    type: 'line',
    data: props.chartData as ChartData,
    options
  });
};
</script>
