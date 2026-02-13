<script setup>
import { ref } from "vue";

const series = ref([
  {
    name: "Revenue",
    data: [31, 40, 28, 51, 42, 109, 100],
  },
  {
    name: "Expenses",
    data: [11, 32, 45, 32, 34, 52, 41],
  },
]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "area",
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  colors: ["#4F46E5", "#10B981"], // Indigo & Emerald
  fill: {
    type: "gradient",
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.7,
      opacityTo: 0.9,
      stops: [0, 90, 100],
    },
  },
});
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-lg border border-gray-100">
    <h3 class="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
    <apexchart
      type="area"
      height="350"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
