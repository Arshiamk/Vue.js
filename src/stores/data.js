import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useDataStore = defineStore('data', () => {
    const items = ref([])
    const loading = ref(false)
    const error = ref(null)

    async function fetchItems() {
        loading.value = true
        error.value = null
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 600))
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            items.value = response.data.map(user => ({
                id: user.id,
                name: user.name,
                email: user.email,
                company: user.company.name,
                city: user.address.city,
                status: Math.random() > 0.3 ? 'Active' : 'Inactive' // Mock status
            }))
        } catch (err) {
            error.value = err.message || 'Failed to fetch data'
        } finally {
            loading.value = false
        }
    }

    return { items, loading, error, fetchItems }
})
