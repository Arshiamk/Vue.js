<script setup>
import { ref } from "vue";

const series = ref([76, 67, 61, 90]);

const chartOptions = ref({
  chart: {
    height: 350,
    type: "radialBar",
  },
  plotOptions: {
    radialBar: {
      offsetY: 0,
      startAngle: 0,
      endAngle: 270,
      hollow: {
        margin: 5,
        size: "30%",
        background: "transparent",
        image: undefined,
      },
      dataLabels: {
        name: {
          show: false,
        },
        value: {
          show: false,
        },
      },
    },
  },
  colors: ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"],
  labels: ["Direct", "Social", "Referral", "Email"],
  legend: {
    show: true,
    floating: true,
    fontSize: "14px",
    position: "left",
    offsetX: 0,
    offsetY: 15,
    labels: {
      useSeriesColors: true,
    },
    markers: {
      width: 0,
      height: 0,
    },
    formatter: function (seriesName, opts) {
      return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex] + "%";
    },
    itemMargin: {
      vertical: 3,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          show: false,
        },
      },
    },
  ],
});
</script>

<template>
  <div
    class="bg-white p-6 rounded-lg shadow-lg border border-gray-100 h-full flex flex-col"
  >
    <div class="flex items-center justify-between mb-2">
      <h3 class="text-lg font-semibold text-gray-800">Traffic Distribution</h3>
      <span
        class="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
        >Last 30 Days</span
      >
    </div>

    <div class="flex-1 flex items-center justify-center relative">
      <apexchart
        type="radialBar"
        height="320"
        :options="chartOptions"
        :series="series"
      ></apexchart>
      <!-- Custom Center Text / Icon could go here if hollow size serves it -->
      <div
        class="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10"
      >
        <!-- Optional background logo or icon -->
      </div>
    </div>

    <div class="grid grid-cols-2 gap-4 mt-4">
      <div class="text-center p-3 rounded-lg bg-indigo-50">
        <p class="text-xs text-indigo-600 font-bold uppercase">Direct</p>
        <p class="text-xl font-bold text-indigo-900">76%</p>
      </div>
      <div class="text-center p-3 rounded-lg bg-emerald-50">
        <p class="text-xs text-emerald-600 font-bold uppercase">Social</p>
        <p class="text-xl font-bold text-emerald-900">67%</p>
      </div>
    </div>
  </div>
</template>
