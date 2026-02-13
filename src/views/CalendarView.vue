<script setup>
import { ref } from "vue";
import { useToast } from "../composables/useToast";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/24/outline";

const { addToast } = useToast();

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const dates = Array.from({ length: 35 }, (_, i) => i + 1); // Simple mock calendar
const currentMonth = ref("October 2023"); // Mock month

const handleDateClick = (date) => {
  if (date > 31) return;
  addToast(`Selected date: October ${date}, 2023`, "info");
};

const handleEventClick = (event, e) => {
  e.stopPropagation();
  addToast(`Event details: ${event}`, "info");
};
</script>

<template>
  <div class="animate-fade-in-up">
    <div class="flex items-center justify-between mb-6">
      <h1 class="text-3xl font-bold text-gray-900 tracking-tight">Calendar</h1>
      <div
        class="flex items-center gap-4 bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-200"
      >
        <button
          @click="addToast('Calendar navigation simulated', 'info')"
          class="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronLeftIcon class="h-5 w-5 text-gray-600" />
        </button>
        <span
          class="text-lg font-semibold text-gray-800 min-w-[140px] text-center"
          >{{ currentMonth }}</span
        >
        <button
          @click="addToast('Calendar navigation simulated', 'info')"
          class="p-1 hover:bg-gray-100 rounded-full transition"
        >
          <ChevronRightIcon class="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>

    <div class="glass p-6 rounded-2xl">
      <div
        class="grid grid-cols-7 gap-4 text-center mb-4 border-b border-gray-100 pb-4"
      >
        <div
          v-for="day in days"
          :key="day"
          class="font-bold text-gray-500 uppercase text-xs tracking-wider"
        >
          {{ day }}
        </div>
      </div>
      <div class="grid grid-cols-7 gap-4">
        <div
          v-for="date in dates"
          :key="date"
          @click="handleDateClick(date)"
          class="aspect-square p-2 border border-gray-100 rounded-xl hover:bg-indigo-50 hover:border-indigo-200 transition-all cursor-pointer relative group flex flex-col justify-start items-start bg-white/50"
          :class="{ 'opacity-0 pointer-events-none': date > 31 }"
        >
          <span
            class="text-gray-700 font-bold text-sm group-hover:text-indigo-600 transition-colors"
            >{{ date <= 31 ? date : "" }}</span
          >

          <!-- Mock Events -->
          <div
            v-if="date === 12"
            @click="handleEventClick('Client Meeting', $event)"
            class="mt-2 w-full bg-indigo-100 text-indigo-700 text-[10px] font-bold px-2 py-1 rounded truncate hover:bg-indigo-200 transition"
          >
            Meeting
          </div>
          <div
            v-if="date === 24"
            @click="handleEventClick('Product Launch', $event)"
            class="mt-2 w-full bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-1 rounded truncate hover:bg-emerald-200 transition"
          >
            Launch
          </div>
          <div
            v-if="date === 5"
            @click="handleEventClick('Team Lunch', $event)"
            class="mt-2 w-full bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-1 rounded truncate hover:bg-amber-200 transition"
          >
            Lunch
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
