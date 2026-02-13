<script setup>
import { ref } from "vue";
import { PlusIcon, EllipsisHorizontalIcon } from "@heroicons/vue/24/outline";
import { useToast } from "../composables/useToast";

const { addToast } = useToast();

const projects = ref([
  {
    id: 1,
    name: "Website Redesign",
    status: "In Progress",
    progress: 45,
    members: [1, 2, 3],
    desc: "Revamping the corporate website with new branding.",
  },
  {
    id: 2,
    name: "Mobile App",
    status: "Completed",
    progress: 100,
    members: [4, 5],
    desc: "iOS and Android app development.",
  },
  {
    id: 3,
    name: "Marketing Campaign",
    status: "Pending",
    progress: 10,
    members: [2, 6],
    desc: "Q3 social media push.",
  },
  {
    id: 4,
    name: "Database Migration",
    status: "In Progress",
    progress: 70,
    members: [1, 4],
    desc: "Moving from SQL to NoSQL.",
  },
]);

const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-800";
    case "In Progress":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-yellow-100 text-yellow-800";
  }
};

const createProject = () => {
  addToast("New Project Created!", "success");
  // Mock adding a project
  projects.value.unshift({
    id: Date.now(),
    name: "New Dashboard Feature",
    status: "Pending",
    progress: 0,
    members: [1],
    desc: "Freshly created project.",
  });
};

const toggleStatus = (project) => {
  if (project.status === "Completed") {
    project.status = "In Progress";
    addToast(`Project "${project.name}" marked as In Progress`, "info");
  } else {
    project.status = "Completed";
    project.progress = 100;
    addToast(`Project "${project.name}" marked as Completed`, "success");
  }
};
</script>

<template>
  <div class="animate-fade-in-up">
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          Projects
        </h1>
        <p class="text-gray-500 mt-1">
          Track and manage your team's initiatives.
        </p>
      </div>
      <button
        @click="createProject"
        class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-md transition-all flex items-center gap-2 font-medium"
      >
        <PlusIcon class="h-5 w-5" />
        New Project
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="project in projects"
        :key="project.id"
        class="glass p-6 rounded-2xl transition-all hover:-translate-y-1 duration-300 border border-transparent hover:border-indigo-100 group relative"
      >
        <div class="flex justify-between items-start mb-4">
          <h3
            class="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors cursor-pointer"
            @click="toggleStatus(project)"
          >
            {{ project.name }}
          </h3>
          <button class="text-gray-400 hover:text-gray-600">
            <EllipsisHorizontalIcon class="h-6 w-6" />
          </button>
        </div>

        <p class="text-gray-500 text-sm mb-6 line-clamp-2 h-10">
          {{ project.desc }}
        </p>

        <div class="mb-4">
          <div class="flex justify-between text-sm text-gray-500 mb-1">
            <span>Progress</span>
            <span class="font-medium text-gray-700"
              >{{ project.progress }}%</span
            >
          </div>
          <div class="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              class="bg-indigo-600 h-2 rounded-full transition-all duration-1000 ease-out"
              :style="{ width: project.progress + '%' }"
            ></div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-auto">
          <div class="flex items-center -space-x-2">
            <img
              v-for="member in project.members"
              :key="member"
              class="w-8 h-8 rounded-full border-2 border-white ring-1 ring-gray-100"
              :src="`https://i.pravatar.cc/150?u=${member}`"
              alt=""
            />
            <button
              class="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-xs font-bold text-gray-500 border-2 border-white hover:bg-gray-100 transition"
            >
              +
            </button>
          </div>
          <span
            @click="toggleStatus(project)"
            :class="[
              'px-2.5 py-0.5 text-xs font-semibold rounded-full cursor-pointer select-none transition-colors border',
              getStatusColor(project.status),
            ]"
            >{{ project.status }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>
