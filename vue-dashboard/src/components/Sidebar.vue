<script setup>
import { ref } from "vue";
import {
  HomeIcon,
  UsersIcon,
  FolderIcon,
  CalendarIcon,
  ChartBarIcon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/vue/24/outline";
import { useRoute } from "vue-router";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["close"]);

const route = useRoute();

const navigation = [
  { name: "Dashboard", href: "/", icon: HomeIcon },
  { name: "Data List", href: "/data", icon: UsersIcon },
  { name: "Reports", href: "/reports", icon: ChartBarIcon },
  { name: "Projects", href: "/projects", icon: FolderIcon },
  { name: "Calendar", href: "/calendar", icon: CalendarIcon },
  { name: "Profile", href: "/profile", icon: UserCircleIcon },
];

const isActive = (path) => route.path === path;
</script>

<template>
  <!-- Off-canvas menu for mobile -->
  <div
    v-if="isOpen"
    class="fixed inset-0 flex z-40 md:hidden"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="fixed inset-0 bg-gray-600 bg-opacity-75"
      aria-hidden="true"
      @click="$emit('close')"
    ></div>

    <div class="relative flex-1 flex flex-col max-w-xs w-full bg-dark">
      <div class="absolute top-0 right-0 -mr-12 pt-2">
        <button
          type="button"
          class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
          @click="$emit('close')"
        >
          <span class="sr-only">Close sidebar</span>
          <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
        </button>
      </div>

      <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
        <div class="flex-shrink-0 flex items-center px-4">
          <span
            class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
          >
            Vue.Arshia
          </span>
        </div>
        <nav class="mt-5 px-2 space-y-1">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            class="group flex items-center px-2 py-2 text-base font-medium rounded-md"
            :class="[
              isActive(item.href)
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
            ]"
          >
            <component
              :is="item.icon"
              class="mr-4 flex-shrink-0 h-6 w-6"
              :class="[
                isActive(item.href)
                  ? 'text-gray-300'
                  : 'text-gray-400 group-hover:text-gray-300',
              ]"
              aria-hidden="true"
            />
            {{ item.name }}
          </router-link>
        </nav>
      </div>
    </div>
    <div class="flex-shrink-0 w-14" aria-hidden="true">
      <!-- Force sidebar to shrink to fit close icon -->
    </div>
  </div>

  <!-- Static sidebar for desktop -->
  <div class="hidden md:flex md:flex-shrink-0">
    <div class="flex flex-col w-64">
      <div
        class="flex-1 flex flex-col min-h-0 bg-gray-900/95 backdrop-blur-xl border-r border-white/10"
      >
        <div class="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div class="flex items-center flex-shrink-0 px-4">
            <span
              class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400"
            >
              Vue.Arshia
            </span>
          </div>
          <nav class="mt-8 flex-1 px-2 space-y-2">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.href"
              class="group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out relative overlow-hidden"
              :class="[
                isActive(item.href)
                  ? 'bg-indigo-600/20 text-indigo-300 shadow-inner ring-1 ring-indigo-500/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white',
              ]"
            >
              <div
                v-if="isActive(item.href)"
                class="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-500 rounded-r-md"
              ></div>
              <component
                :is="item.icon"
                class="mr-3 flex-shrink-0 h-6 w-6 transition-colors"
                :class="[
                  isActive(item.href)
                    ? 'text-indigo-400'
                    : 'text-gray-500 group-hover:text-gray-300',
                ]"
                aria-hidden="true"
              />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
        <div class="flex-shrink-0 flex border-t border-white/10 p-4">
          <router-link to="/profile" class="group block w-full flex-shrink-0">
            <div class="flex items-center">
              <div>
                <img
                  class="inline-block h-9 w-9 rounded-full ring-2 ring-white/10"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
                />
              </div>
              <div class="ml-3">
                <p
                  class="text-sm font-medium text-white group-hover:text-gray-200"
                >
                  Arshia
                </p>
                <p
                  class="text-xs font-medium text-gray-400 group-hover:text-gray-300"
                >
                  View profile
                </p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
