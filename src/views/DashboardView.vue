<script setup>
import {
  UsersIcon,
  CurrencyDollarIcon,
  CursorArrowRaysIcon,
  ArrowTrendingUpIcon,
} from "@heroicons/vue/24/outline";
import RevenueChart from "../components/RevenueChart.vue";
import TrafficChart from "../components/TrafficChart.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const stats = [
  {
    name: "Total Subscribers",
    stat: "71,897",
    icon: UsersIcon,
    change: "12%",
    changeType: "increase",
    bg: "bg-gradient-to-br from-indigo-500 to-purple-600",
    route: "/data",
  },
  {
    name: "Avg. Open Rate",
    stat: "58.16%",
    icon: CursorArrowRaysIcon,
    change: "5.4%",
    changeType: "increase",
    bg: "bg-gradient-to-br from-green-400 to-cyan-500",
    route: "/reports",
  },
  {
    name: "Avg. Click Rate",
    stat: "24.57%",
    icon: CurrencyDollarIcon,
    change: "3.2%",
    changeType: "decrease",
    bg: "bg-gradient-to-br from-amber-400 to-orange-500",
    route: "/projects",
  },
];

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <div class="animate-fade-in-up">
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
        Dashboard Overview
      </h1>
      <button
        @click="navigateTo('/reports')"
        class="bg-primary hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all flex items-center gap-2 transform active:scale-95"
      >
        <ArrowTrendingUpIcon class="h-5 w-5" />
        Generate Report
      </button>
    </div>

    <!-- Stats Cards -->
    <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
      <div
        v-for="item in stats"
        :key="item.name"
        @click="navigateTo(item.route)"
        class="relative bg-white/80 backdrop-blur-md pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow-xl rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl border border-white/20 cursor-pointer group"
      >
        <dt>
          <div
            :class="[
              'absolute rounded-xl p-3 shadow-lg transition-transform group-hover:scale-110 duration-300',
              item.bg,
            ]"
          >
            <component
              :is="item.icon"
              class="h-6 w-6 text-white"
              aria-hidden="true"
            />
          </div>
          <p
            class="ml-16 text-sm font-medium text-gray-500 truncate group-hover:text-indigo-600 transition-colors"
          >
            {{ item.name }}
          </p>
        </dt>
        <dd class="ml-16 pb-6 flex items-baseline sm:pb-7">
          <p class="text-3xl font-bold text-gray-900">{{ item.stat }}</p>
          <p
            v-if="item.change"
            :class="[
              item.changeType === 'increase'
                ? 'text-green-600 bg-green-100'
                : 'text-red-600 bg-red-100',
              'ml-3 flex items-baseline text-xs font-bold px-2 py-0.5 rounded-full',
            ]"
          >
            <span v-if="item.changeType === 'increase'">
              <svg
                class="self-center flex-shrink-0 h-3 w-3 text-green-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            <span v-else>
              <svg
                class="self-center flex-shrink-0 h-3 w-3 text-red-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </span>
            {{ item.change }}
          </p>
        </dd>
        <!-- Hover indicator -->
        <div
          class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
        ></div>
      </div>
    </dl>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
      <div class="lg:col-span-2">
        <RevenueChart />
      </div>
      <div>
        <TrafficChart />
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-xl font-bold text-gray-900 mb-4">Recent Transactions</h2>
      <div
        class="bg-white/90 backdrop-blur shadow-lg rounded-xl overflow-hidden border border-gray-100"
      >
        <ul role="list" class="divide-y divide-gray-100">
          <li
            v-for="i in 5"
            :key="i"
            @click="navigateTo('/profile')"
            class="hover:bg-gray-50 transition-colors cursor-pointer group"
          >
            <div class="px-6 py-4 flex items-center justify-between">
              <div class="flex items-center gap-4">
                <img
                  class="h-10 w-10 rounded-full ring-2 ring-white shadow-sm group-hover:ring-indigo-400 transition-all"
                  :src="'https://i.pravatar.cc/150?u=' + i"
                  alt=""
                />
                <div>
                  <p
                    class="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors"
                  >
                    Payment received from
                    <span class="font-bold">User {{ i }}</span>
                  </p>
                  <p class="text-xs text-gray-500">Invoiced {{ i }} days ago</p>
                </div>
              </div>
              <div class="flex flex-col items-end">
                <span
                  class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
                >
                  Completed
                </span>
                <p class="text-sm font-bold text-gray-900 mt-1">$120.00</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
