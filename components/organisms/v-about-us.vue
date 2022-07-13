<template>
  <v-container class="_about_us">
    <div class="_down_arrow" />
    <ul>
      <li v-for="(item, index) in item.items" :key="'about_us_'+index" class="_item">
        <h2>{{ index + 1 }}. {{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </li>
    </ul>
    <div class="_animated_arrow" />
    <nuxt-link class="default_button" to="/">
      {{ item.cta }}
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  mounted () {
    const gsap = this.$gsap.base

    const items = gsap.utils.toArray('._about_us ._item')
    const arrowMasked = document.querySelector('._about_us ._animated_arrow')
    const arrowDown = document.querySelector('._about_us ._down_arrow')

    items.forEach((item, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'center center',
          end: 'center center',
          toggleActions: 'play none reverse none'
        }
      }).to(arrowMasked, {
        rotation: -90 * index,
        y: item.offsetTop + item.children[1].offsetTop - 75 - 50 - 82,
        duration: 0.4,
        ease: 'ease'
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'center center',
          end: 'top center',
          toggleActions: 'play none reverse none'
        }
      }).to(arrowDown, {
        y: item.offsetTop + item.children[1].offsetTop - 75 - 50 - 82,
        duration: 0.6,
        ease: 'ease'
      })
    })
  }
}
</script>

<style lang="scss">
  ._about_us{
    .container{
      @apply relative flex flex-col gap-150px pt-75px;
      ul{
        @apply flex flex-col gap-75px;

        ._item{
          @apply flex flex-col gap-40px pl-65px relative;

          h2{
            @apply max-w-500px;
          }
          p{
            @apply max-w-590px;
          }

          &:nth-child(1) h2{
            @apply max-w-550px;
          }
          &:nth-child(2) p{
            @apply max-w-630px;
          }
          &:nth-last-child(1){
            h2{
              @apply max-w-700px;
            }
            p{
              @apply max-w-610px;
            }
          }

          &::before{
            content: '';
            background: rgba(0, 63, 242, 0.5);
            height: calc(100% + 150px);
            @apply absolute left-0 top-0
                    w-2px -mt-75px;
          }
        }
      }

      ._down_arrow{
        @apply w-38px h-38px
              absolute -left-17px top-162px z-1
              bg-no-repeat bg-cover;
        background-image: url('/images/arrow_down.png');
      }

      ._animated_arrow{
        @apply w-200px h-200px mr-110px
              absolute right-0 top-82px z-1
              bg-no-repeat bg-cover;
        background-image: url('/images/masked_arrow_background.gif');
        mask: no-repeat center url('/images/masked_arrow_mask.png');
        -webkit-mask: no-repeat center url('/images/masked_arrow_mask.png');
        mask-size: contain;
        -webkit-mask-size: contain;
      }
    }
    .default_button{
      @apply w-max mx-auto;
    }
  }
</style>
