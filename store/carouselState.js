import { defineStore } from 'pinia'

export const useCarouselState = defineStore({
  id: 'carouselState',
  state: () => ({
    firstFocusBoost: false,
    companies: false
  }),
  getters: {},
  actions: {}
})
