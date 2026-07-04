import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import axios from 'axios'
import { useDataStore } from '../src/stores/data'

vi.mock('axios')

describe('data store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.clearAllMocks()
  })

  it('fetches users and maps them into table rows', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'Jane Doe',
          email: 'jane@example.com',
          company: { name: 'Acme Inc' },
          address: { city: 'Berlin' },
        },
      ],
    })

    const store = useDataStore()
    const promise = store.fetchItems()

    expect(store.loading).toBe(true)
    await vi.advanceTimersByTimeAsync(600)
    await promise

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.items).toHaveLength(1)
    expect(store.items[0]).toMatchObject({
      id: 1,
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: 'Acme Inc',
      city: 'Berlin',
    })
    expect(['Active', 'Inactive']).toContain(store.items[0].status)
  })

  it('stores the error message when the request fails', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'))

    const store = useDataStore()
    const promise = store.fetchItems()

    await vi.advanceTimersByTimeAsync(600)
    await promise

    expect(store.loading).toBe(false)
    expect(store.error).toBe('Network Error')
    expect(store.items).toHaveLength(0)
  })
})
