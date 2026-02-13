<script setup>
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { useToast } from "../composables/useToast";
// removed headlessui

import { Bars3Icon, BellIcon } from "@heroicons/vue/24/outline";

// Note: HeadlessUI is great but to keep dependency count low and "demo" simple, I'll use simple conditional rendering for dropdown if HeadlessUI isn't installed.
// Actually, I didn't install HeadlessUI. I'll implement a custom dropdown or just a simple button for Logout.
import { ref } from "vue";

const emit = defineEmits(["toggle-sidebar"]);
const authStore = useAuthStore();
const router = useRouter();
const { addToast } = useToast();

const dropdownOpen = ref(false);

const logout = () => {
  authStore.logout();
  router.push("/login");
};
</script>

<template>
  <div class="relative z-10 flex-shrink-0 flex h-16 bg-white shadow">
    <button
      type="button"
      class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
      @click="$emit('toggle-sidebar')"
    >
      <span class="sr-only">Open sidebar</span>
      <Bars3Icon class="h-6 w-6" aria-hidden="true" />
    </button>
    <div class="flex-1 px-4 flex justify-between">
      <div class="flex-1 flex">
        <!-- Search bar could go here -->
      </div>
      <div class="ml-4 flex items-center md:ml-6">
        <button
          @click="addToast('No new notifications', 'info')"
          class="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span class="sr-only">View notifications</span>
          <BellIcon class="h-6 w-6" aria-hidden="true" />
        </button>

        <!-- Profile dropdown -->
        <div class="ml-3 relative">
          <div>
            <button
              @click="dropdownOpen = !dropdownOpen"
              class="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span class="sr-only">Open user menu</span>
              <img
                class="h-8 w-8 rounded-full"
                :src="
                  authStore.user?.avatar ||
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                "
                alt=""
              />
            </button>
          </div>

          <div
            v-if="dropdownOpen"
            class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="user-menu-button"
            tabindex="-1"
            @click.away="dropdownOpen = false"
          >
            <button
              @click="
                router.push('/profile');
                dropdownOpen = false;
              "
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-0"
            >
              Your Profile
            </button>
            <button
              @click="
                addToast('Settings panel not implemented in demo', 'warning');
                dropdownOpen = false;
              "
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-1"
            >
              Settings
            </button>
            <button
              @click="logout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              role="menuitem"
              tabindex="-1"
              id="user-menu-item-2"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Backdrop for dropdown (simple click away handler alternative) -->
  <div
    v-if="dropdownOpen"
    class="fixed inset-0 z-0"
    @click="dropdownOpen = false"
  ></div>
</template>
