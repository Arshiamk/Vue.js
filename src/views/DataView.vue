<script setup>
import { onMounted, ref, computed } from "vue";
import { useDataStore } from "../stores/data";
import {
  MagnifyingGlassIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { useRouter } from "vue-router";
import { useToast } from "../composables/useToast";

const router = useRouter();
const dataStore = useDataStore();
const { addToast } = useToast();

const searchQuery = ref("");
const currentPage = ref(1);
const itemsPerPage = 8;

onMounted(() => {
  dataStore.fetchItems();
});

const filteredItems = computed(() => {
  return dataStore.items.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage),
);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredItems.value.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};

const navigateToProfile = (id) => {
  router.push("/profile");
  addToast(`Viewing profile for User ID: ${id}`, "info");
};

const editUser = (item) => {
  addToast(`Editing user: ${item.name}`, "info");
};

const deleteUser = (item) => {
  // In a real app, we would call a store action to delete
  // dataStore.deleteItem(item.id)
  addToast(`User ${item.name} deleted`, "error");
};
</script>

<template>
  <div class="animate-fade-in-up">
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4"
    >
      <div>
        <h1 class="text-3xl font-bold text-gray-900 tracking-tight">
          User Directory
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Manage and view all registered users.
        </p>
      </div>
      <div class="relative rounded-md shadow-sm max-w-xs w-full">
        <div
          class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        >
          <MagnifyingGlassIcon
            class="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          v-model="searchQuery"
          class="input-glass block w-full pl-10 sm:text-sm rounded-lg py-2.5"
          placeholder="Search users..."
        />
      </div>
    </div>

    <div class="glass rounded-xl overflow-hidden">
      <!-- Loading Skeleton -->
      <div v-if="dataStore.loading" class="p-6 space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center space-x-4 animate-pulse"
        >
          <div class="rounded-full bg-gray-200 h-10 w-10"></div>
          <div class="flex-1 space-y-2 py-1">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="dataStore.error" class="p-12 text-center">
        <div
          class="inline-flex items-center justify-center p-4 bg-red-100 rounded-full mb-4"
        >
          <svg
            class="h-8 w-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-medium text-gray-900">Failed to load data</h3>
        <p class="text-gray-500 mt-1 mb-6">{{ dataStore.error }}</p>
        <button
          @click="dataStore.fetchItems"
          class="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>

      <!-- Data Table -->
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200/50">
          <thead class="bg-gray-50/50">
            <tr>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Company
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
              <th
                scope="col"
                class="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Location
              </th>
              <th scope="col" class="relative px-6 py-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white/50 divide-y divide-gray-200/50">
            <tr
              v-for="person in paginatedItems"
              :key="person.id"
              class="hover:bg-white/80 transition-colors duration-200 group"
            >
              <td
                class="px-6 py-4 whitespace-nowrap cursor-pointer"
                @click="navigateToProfile(person.id)"
              >
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img
                      class="h-10 w-10 rounded-full ring-2 ring-white group-hover:ring-indigo-400 transition-all"
                      :src="'https://i.pravatar.cc/150?u=' + person.id"
                      alt=""
                    />
                  </div>
                  <div class="ml-4">
                    <div
                      class="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors"
                    >
                      {{ person.name }}
                    </div>
                    <div class="text-sm text-gray-500">{{ person.email }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ person.company }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span
                  class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="[
                    person.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800',
                  ]"
                >
                  {{ person.status }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ person.city }}
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"
              >
                <div
                  class="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <button
                    @click="editUser(person)"
                    class="text-indigo-600 hover:text-indigo-900"
                    title="Edit"
                  >
                    <PencilSquareIcon class="h-5 w-5" />
                  </button>
                  <button
                    @click="deleteUser(person)"
                    class="text-red-400 hover:text-red-600"
                    title="Delete"
                  >
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
            <tr v-if="filteredItems.length === 0">
              <td colspan="5" class="px-6 py-12 text-center text-gray-500">
                No users found matching "{{ searchQuery }}"
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div
        v-if="
          !dataStore.loading && !dataStore.error && filteredItems.length > 0
        "
        class="bg-gray-50/50 px-4 py-3 flex items-center justify-between border-t border-gray-200/50 sm:px-6"
      >
        <div
          class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between"
        >
          <div>
            <p class="text-sm text-gray-700">
              Showing
              <span class="font-medium">{{
                (currentPage - 1) * itemsPerPage + 1
              }}</span>
              to
              <span class="font-medium">{{
                Math.min(currentPage * itemsPerPage, filteredItems.length)
              }}</span>
              of
              <span class="font-medium">{{ filteredItems.length }}</span>
              results
            </p>
          </div>
          <div>
            <nav
              class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
