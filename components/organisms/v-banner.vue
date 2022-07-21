<template>
  <v-container class="_v_banner" ref="this_banner">
    <div class="_text">
      <h1>{{ item.title }}</h1>
      <p v-html="item.description" />
      <button v-if="item.cta" class="alt" @click="goTo(cta, goToCenter)">
        {{ item.cta }}
      </button>
    </div>
    <mouseIcon class="_mouse_icon" />
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    cta: {
      type: String,
      required: true
    },
    goToCenter: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    // const gsap = this.$gsap.base
    // const ScrollTrigger = this.$gsap.ScrollTrigger

    // const boxSize = this.$refs.this_banner.$el.querySelector('.container')
    // const h1 = this.$refs.this_banner.$el.querySelector('.container ._text')

    // const anim = gsap.fromTo(
    //   h1,
    //   {
    //     autoAlpha: 0.3,
    //     y: -50
    //   },
    //   {
    //     duration: 0.6,
    //     autoAlpha: 1,
    //     y: 0
    //   }
    // )

    // if (boxSize.offsetTop !== 0) {
    //   ScrollTrigger.create({
    //     trigger: boxSize,
    //     animation: anim,
    //     start: 'top center',
    //     end: 'bottom center',
    //     toggleActions: 'restart none restart none'
    //   })
    // } else {
    //   anim.play()

    //   ScrollTrigger.create({
    //     trigger: this.$refs.this_banner.$el,
    //     animation: anim,
    //     start: 'top top',
    //     toggleActions: 'restart reverse reverse restart'
    //   })
    // }
  },
  methods: {
    goTo (id, center = false) {
      const element = document.getElementById(id)
      let position = 0

      if (center) {
        position = element?.offsetTop - (this.$refs.this_banner.$el.offsetHeight * 0.2)
      } else {
        position = element?.offsetTop
      }

      scrollTo({
        behavior: 'smooth',
        top: position || element?.offsetTop
      })
    }
  }
}
</script>

<style lang="scss">
  ._v_banner{
    @apply bg-no-repeat bg-cover -mt-75px;
    .container{
      @apply relative h-100vh flex items-center;
      ._text{
        @apply flex flex-col gap-40px p-75px
              justify-center
              text-$text-light;

        p{
          @apply max-w-598px;
        }
        .alt{
          @apply w-max;
        }
      }
      ._mouse_icon{
        @apply absolute left-0 bottom-40px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._v_banner{
      .container{
        @apply pb-40px gap-30px;

        ._text{
          @apply p-0 -mt-80px;
          .alt{
            @apply mx-auto;
          }
        }
        ._mouse_icon{
          @apply left-1/2 transform -translate-x-1/2 bottom-80px;
        }
      }
    }
  }
</style>
