<script setup>
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import { useToast } from "../composables/useToast";

const { addToast } = useToast();
const authStore = useAuthStore();
const isEditing = ref(false);

const form = ref({
  username: "Arshia",
  role: "Senior Developer",
  email: "arshia@example.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  bio: "Passionate developer with a knack for building beautiful and functional user interfaces. Currently working on Vue.Arshia, a premium dashboard template.",
});

const saveProfile = () => {
  isEditing.value = false;
  // Update store (mock)
  if (authStore.user) {
    authStore.user.username = form.value.username;
  }
  addToast("Profile updated successfully!", "success");
};

const toggleEdit = () => {
  if (isEditing.value) {
    saveProfile();
  } else {
    isEditing.value = true;
  }
};
</script>

<template>
  <div class="animate-fade-in-up">
    <h1 class="text-3xl font-bold text-gray-900 tracking-tight mb-6">
      My Profile
    </h1>

    <div class="glass rounded-2xl overflow-hidden">
      <!-- Cover Image -->
      <div class="h-48 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
        <button
          @click="addToast('Cover image upload simulated', 'info')"
          class="absolute top-4 right-4 bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm transition"
        >
          Change Cover
        </button>
      </div>

      <div class="px-8 pb-8">
        <div class="relative flex justify-between items-end -mt-16 mb-6">
          <div class="relative group">
            <img
              class="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white object-cover"
              :src="authStore.user?.avatar || 'https://i.pravatar.cc/300'"
              alt="Avatar"
            />
            <div
              @click="addToast('Avatar upload simulated', 'info')"
              class="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white text-xs font-bold"
            >
              Change
            </div>
          </div>

          <button
            @click="toggleEdit"
            :class="[
              'px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center gap-2',
              isEditing
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50',
            ]"
          >
            {{ isEditing ? "Save Changes" : "Edit Profile" }}
          </button>
        </div>

        <div>
          <div class="flex items-center gap-2 mb-1">
            <input
              v-if="isEditing"
              v-model="form.username"
              class="text-2xl font-bold text-gray-900 bg-white/50 border border-indigo-200 rounded px-2 py-0.5 focus:ring-2 focus:ring-indigo-500 outline-none w-full max-w-xs"
            />
            <h2 v-else class="text-2xl font-bold text-gray-900">
              {{ form.username }}
            </h2>
          </div>

          <div class="flex items-center gap-2">
            <input
              v-if="isEditing"
              v-model="form.role"
              class="text-gray-500 bg-white/50 border border-indigo-200 rounded px-2 py-0.5 focus:ring-2 focus:ring-indigo-500 outline-none w-full max-w-xs"
            />
            <p v-else class="text-gray-500">{{ form.role }}</p>
          </div>
        </div>

        <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900">
              Contact Information
            </h3>
            <div class="space-y-4 text-gray-600">
              <div class="flex items-center gap-3">
                <span class="w-24 text-gray-400 font-medium">Email:</span>
                <input
                  v-if="isEditing"
                  v-model="form.email"
                  class="input-glass px-2 py-1 rounded w-full"
                />
                <span v-else>{{ form.email }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-24 text-gray-400 font-medium">Phone:</span>
                <input
                  v-if="isEditing"
                  v-model="form.phone"
                  class="input-glass px-2 py-1 rounded w-full"
                />
                <span v-else>{{ form.phone }}</span>
              </div>
              <div class="flex items-center gap-3">
                <span class="w-24 text-gray-400 font-medium">Location:</span>
                <input
                  v-if="isEditing"
                  v-model="form.location"
                  class="input-glass px-2 py-1 rounded w-full"
                />
                <span v-else>{{ form.location }}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-4 text-gray-900">Bio</h3>
            <textarea
              v-if="isEditing"
              v-model="form.bio"
              rows="4"
              class="input-glass w-full rounded-lg p-3"
            ></textarea>
            <p
              v-else
              class="text-gray-600 leading-relaxed bg-white/30 p-4 rounded-lg border border-white/40"
            >
              {{ form.bio }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
