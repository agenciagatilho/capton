import { useToastStore } from '@/store/toastState'

export default function (_, inject) {
  const useToast = useToastStore()

  const main = {
    set (message, options = {}) {
      const useOptions = {
        status: options?.time || 'sucess',
        time: options?.time || 3
      }

      useToast.showToast(message, 1000 * useOptions.time)
    }
  }

  inject('toast', main)
}
