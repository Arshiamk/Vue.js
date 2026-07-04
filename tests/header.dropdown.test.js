import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia } from 'pinia'
import { createRouter, createMemoryHistory } from 'vue-router'
import Header from '../src/components/Header.vue'

const stubRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', component: { template: '<div />' } }],
  })

describe('Header profile dropdown', () => {
  let wrapper

  afterEach(() => {
    wrapper?.unmount()
  })

  const mountHeader = () =>
    mount(Header, {
      global: { plugins: [createPinia(), stubRouter()] },
      attachTo: document.body,
    })

  it('opens when the avatar button is clicked', async () => {
    wrapper = mountHeader()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)

    await wrapper.find('#user-menu-button').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  })

  it('closes when clicking outside the dropdown', async () => {
    wrapper = mountHeader()
    await wrapper.find('#user-menu-button').trigger('click')
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)

    document.body.click()
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="menu"]').exists()).toBe(false)
  })

  it('stays open when clicking inside the dropdown menu container', async () => {
    wrapper = mountHeader()
    await wrapper.find('#user-menu-button').trigger('click')

    wrapper.find('[role="menu"]').element.dispatchEvent(
      new MouseEvent('click', { bubbles: true })
    )
    await wrapper.vm.$nextTick()
    expect(wrapper.find('[role="menu"]').exists()).toBe(true)
  })
})
