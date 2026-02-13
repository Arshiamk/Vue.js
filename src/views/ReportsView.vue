<script setup>
import { ref } from "vue";
import { useToast } from "../composables/useToast";
import { ArrowDownTrayIcon } from "@heroicons/vue/24/outline";

const { addToast } = useToast();

const series = ref([
  {
    name: "Sales",
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
  },
  {
    name: "Revenue",
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
  },
  {
    name: "Free Cash Flow",
    data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
  },
]);

const growthSeries = ref([
  {
    name: "New Users",
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
]);

const chartOptions = ref({
  chart: {
    type: "bar",
    height: 350,
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: "55%",
      borderRadius: 6,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ["transparent"],
  },
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    axisBorder: { show: false },
    axisTicks: { show: false },
  },
  yaxis: {
    title: {
      text: "$ (thousands)",
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return "$ " + val + " thousands";
      },
    },
  },
  colors: ["#4F46E5", "#10B981", "#F59E0B"],
  grid: {
    borderColor: "#f1f1f1",
  },
});

const lineChartOptions = ref({
  chart: {
    height: 350,
    type: "line",
    zoom: { enabled: false },
    toolbar: { show: false },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    width: 3,
  },
  colors: ["#8B5CF6"],
  xaxis: {
    categories: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
  },
  tooltip: {
    theme: "dark",
  },
});

const selectedRange = ref("Last 6 Months");

const generateReport = () => {
  addToast("Generating comprehensive report...", "success");
};

const exportData = (format) => {
  addToast(`Exporting data as ${format}...`, "info");
};
</script>

<template>
  <div class="animate-fade-in-up">
    <div
      class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          Reports & Analytics
        </h1>
        <p class="text-gray-500 mt-1">
          Deep dive into your financial and operational performance.
        </p>
      </div>
      <div class="flex items-center gap-2">
        <select
          v-model="selectedRange"
          class="input-glass rounded-lg py-2 px-3 text-sm font-medium text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option>Last 30 Days</option>
          <option>Last 6 Months</option>
          <option>Year to Date</option>
        </select>
        <button
          @click="exportData('PDF')"
          class="bg-white hover:bg-gray-50 text-gray-700 px-3 py-2 border border-gray-300 rounded-lg shadow-sm transition-all flex items-center gap-2 text-sm font-medium"
        >
          <ArrowDownTrayIcon class="h-4 w-4" />
          Export
        </button>
        <button
          @click="generateReport"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all text-sm font-bold"
        >
          Run Report
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="glass p-6 rounded-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">Financial Performance</h2>
          <span
            class="text-xs font-semibold px-2 py-1 bg-green-100 text-green-700 rounded-full"
            >+12.5% vs last period</span
          >
        </div>
        <apexchart
          type="bar"
          height="350"
          :options="chartOptions"
          :series="series"
        ></apexchart>
      </div>

      <div class="glass p-6 rounded-2xl">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">User Growth</h2>
          <span
            class="text-xs font-semibold px-2 py-1 bg-purple-100 text-purple-700 rounded-full"
            >All Time High</span
          >
        </div>
        <apexchart
          type="line"
          height="350"
          :options="lineChartOptions"
          :series="growthSeries"
        ></apexchart>
      </div>
    </div>
  </div>
</template>
