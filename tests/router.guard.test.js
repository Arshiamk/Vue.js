import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import router from '../src/router'
import { useAuthStore } from '../src/stores/auth'

describe('router navigation guards', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('redirects unauthenticated visitors to the login page', async () => {
    await router.push('/')
    expect(router.currentRoute.value.name).toBe('login')
  })

  it('keeps authenticated users away from the login page', async () => {
    const auth = useAuthStore()
    auth.user = { username: 'demo', role: 'admin' }

    await router.push('/')
    expect(router.currentRoute.value.name).toBe('dashboard')

    await router.push('/login')
    expect(router.currentRoute.value.name).toBe('dashboard')
  })

  it('lets authenticated users reach protected routes', async () => {
    const auth = useAuthStore()
    auth.user = { username: 'demo', role: 'admin' }

    await router.push('/projects')
    expect(router.currentRoute.value.name).toBe('projects')
  })

  it('renders the not-found route for unknown authenticated paths', async () => {
    const auth = useAuthStore()
    auth.user = { username: 'demo', role: 'admin' }

    await router.push('/does-not-exist')
    expect(router.currentRoute.value.name).toBe('not-found')
  })
})
