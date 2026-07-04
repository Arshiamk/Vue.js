import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../src/stores/auth'

describe('auth store', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('logs in with non-empty credentials and persists the user', async () => {
    const store = useAuthStore()
    expect(store.isAuthenticated).toBe(false)

    const promise = store.login('demo', 'secret')
    await vi.advanceTimersByTimeAsync(800)
    const user = await promise

    expect(user.username).toBe('demo')
    expect(user.role).toBe('admin')
    expect(store.isAuthenticated).toBe(true)
    expect(JSON.parse(localStorage.getItem('user')).username).toBe('demo')
  })

  it('rejects empty credentials', async () => {
    const store = useAuthStore()

    const assertion = expect(store.login('', '')).rejects.toThrow('Invalid credentials')
    await vi.advanceTimersByTimeAsync(800)
    await assertion

    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('user')).toBeNull()
  })

  it('logout clears the session and storage', async () => {
    const store = useAuthStore()

    const promise = store.login('demo', 'secret')
    await vi.advanceTimersByTimeAsync(800)
    await promise

    store.logout()

    expect(store.user).toBeNull()
    expect(store.isAuthenticated).toBe(false)
    expect(localStorage.getItem('user')).toBeNull()
  })
})
