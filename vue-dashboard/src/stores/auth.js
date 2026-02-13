import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref(JSON.parse(localStorage.getItem('user')) || null)
    const router = useRouter()

    const isAuthenticated = computed(() => !!user.value)

    function login(username, password) {
        return new Promise((resolve, reject) => {
            // Simulate API delay
            setTimeout(() => {
                if (username && password) {
                    const mockUser = { username, role: 'admin', avatar: 'https://i.pravatar.cc/150?u=' + username }
                    user.value = mockUser
                    localStorage.setItem('user', JSON.stringify(mockUser))
                    resolve(mockUser)
                } else {
                    reject(new Error('Invalid credentials'))
                }
            }, 800)
        })
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
        // We need to handle redirect in the component or here if router is available, 
        // but often better to return promise or let component handle navigation
    }

    return { user, isAuthenticated, login, logout }
})
