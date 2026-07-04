import { onMounted, onBeforeUnmount } from 'vue'

/**
 * Invokes `callback` whenever a click lands outside the element
 * referenced by `targetRef`. Listeners are registered on mount and
 * cleaned up automatically when the component unmounts.
 */
export function useClickOutside(targetRef, callback) {
  const handler = (event) => {
    if (targetRef.value && !targetRef.value.contains(event.target)) {
      callback(event)
    }
  }

  onMounted(() => document.addEventListener('click', handler, true))
  onBeforeUnmount(() => document.removeEventListener('click', handler, true))
}
