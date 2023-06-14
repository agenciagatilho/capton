import { defineStore } from 'pinia'

export const useMenuStore = defineStore({
  id: 'menuState',
  state: () => ({
    show: false,
    fixedBG: false
  }),
  getters: {},
  actions: {}
})
