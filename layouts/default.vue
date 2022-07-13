<template>
  <div id="body">
    <v-header />
    <Nuxt />
    <v-footer />
    <BaseToast />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  mounted () {
    this.startAnimation()
  },
  methods: {
    startAnimation () {
      const gsap = this.$gsap.base
      const ScrollTrigger = this.$gsap.ScrollTrigger

      const items = gsap.utils.toArray('#body main .container >*')

      items.forEach((item, index) => {
        const anim = gsap.fromTo(
          item,
          {
            autoAlpha: 0.4,
            y: -50
          },
          {
            durantion: 0.5,
            autoAlpha: 1,
            y: 1
          }
        )

        ScrollTrigger.create({
          trigger: item,
          animation: anim,
          start: 'top bottom',
          end: 'bottom top',
          toggleActions: 'restart none none none'
        })
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
      @apply relative;
    }
  }
</style>
