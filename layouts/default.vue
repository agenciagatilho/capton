<template>
  <div id="body">
    <v-header />
    <v-mobile-menu />
    <Nuxt />
    <v-footer />
    <BaseToast />
  </div>
</template>

<script>
import { useMenuStore } from '~/store/menuState'
export default {
  data () {
    return {
      state: useMenuStore()
    }
  },
  watch: {
    $route (newVal, oldVal) {
      setTimeout(() => {
        this.startAnimation()
      }, 600)
      if (newVal.name === 'politica-de-privacidade') {
        this.state.fixedBG = true
      } else {
        this.state.fixedBG = false
      }
    }
  },
  mounted () {
    this.startAnimation()
    if (this.$route.name === 'politica-de-privacidade') {
      this.state.fixedBG = true
    } else {
      this.state.fixedBG = false
    }
  },
  methods: {
    startAnimation () {
      const gsap = this.$gsap.base
      const ScrollTrigger = this.$gsap.ScrollTrigger

      const items = gsap.utils.toArray(
        '#body main .container'
      )

      items.forEach((item, index) => {
        if (index !== 0) {
          item.classList.add('scroll')
          item.classList.add('hide')

          ScrollTrigger.create({
            trigger: item,
            start: 'top bottom',
            end: 'center bottom',
            onEnter: () => {
              item.classList.remove('hide')
            },
            onLeaveBack: () => {
              item.classList.add('hide')
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
  #body{
    @apply flex flex-col bg-$bg gap-125px;
  }
  #toasts{
    @apply top-0 left-1/2;
  }

  @media screen and (max-width: 768px) {
    #body{
      @apply relative gap-75px;
    }
  }
</style>
