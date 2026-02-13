<script setup>
import { useToast } from "../composables/useToast";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/vue/24/outline";

const { toasts, removeToast } = useToast();
</script>

<template>
  <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
    <transition-group name="toast">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="min-w-[300px] p-4 rounded-lg shadow-lg flex items-start gap-3 transform transition-all duration-300"
        :class="{
          'bg-green-50 text-green-800 border-l-4 border-green-500':
            toast.type === 'success',
          'bg-red-50 text-red-800 border-l-4 border-red-500':
            toast.type === 'error',
          'bg-blue-50 text-blue-800 border-l-4 border-blue-500':
            toast.type === 'info',
        }"
      >
        <CheckCircleIcon
          v-if="toast.type === 'success'"
          class="h-6 w-6 text-green-500 shrink-0"
        />
        <XCircleIcon
          v-if="toast.type === 'error'"
          class="h-6 w-6 text-red-500 shrink-0"
        />
        <InformationCircleIcon
          v-if="toast.type === 'info'"
          class="h-6 w-6 text-blue-500 shrink-0"
        />

        <p class="text-sm font-medium flex-1">{{ toast.message }}</p>

        <button
          @click="removeToast(toast.id)"
          class="text-gray-400 hover:text-gray-600"
        >
          <XMarkIcon class="h-5 w-5" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
