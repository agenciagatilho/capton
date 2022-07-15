<template>
  <div
    class="_clicker"
    @mouseenter="()=>{if($device.isDesktop) {pauseCarousel()}}"
    @mouseleave="()=>{if($device.isDesktop) {playCarousel()}}"
  >
    <VueSlickCarousel
      v-bind="settings"
      ref="v_carousel"
      class="_v_carousel"
      :class="{'show': isShow}"
      :style="`--close: ${closeHeight}; --open: ${openHeight};`"
    >
      <slot />
    </VueSlickCarousel>
  </div>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { useCarouselState } from '@/store/carouselState'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  props: {
    settings: {
      type: Object,
      default: () => ({
        dots: true,
        arrows: false,
        infinite: true,
        speed: 6000,
        // focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true,
        autoplay: true,
        autoplaySpeed: 100,
        cssEase: 'ease',
        pauseOnDotsHover: false,
        pauseOnHover: false,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              dots: false,
              arrows: true,
              variableWidth: false,
              speed: 1000,
              autoplay: false
            }
          }
        ]
      })
    },
    name: {
      type: String,
      required: true
    },
    closeHeight: {
      type: String,
      default: '300px'
    },
    openHeight: {
      type: String,
      default: '450px'
    }
  },
  data () {
    return {
      state: useCarouselState()
    }
  },
  computed: {
    isShow () {
      return this.state[this.name]
    }
  },
  methods: {
    pauseCarousel () {
      console.log('enter')
      this.$refs.v_carousel.pause()
      const track = this.$refs.v_carousel.$el.querySelector('.slick-track')
      let translateTrack = getComputedStyle(track)
        .transform
        .replace('matrix(', '')
        .replace(')', '')
        .split(',').filter(val => val < 0)[0]

      translateTrack = `
        --val-resume: ${track.style.transform};
        --val-pause: translate3d(${translateTrack}px, 0px, 0px);
        --val-transition: ${getComputedStyle(track).transition};
      `
      this.$refs.v_carousel.$el.querySelector('.slick-list').style = translateTrack
      track.classList.add('paused')
    },
    playCarousel () {
      console.log('exit')
      const track = this.$refs.v_carousel.$el.querySelector('.slick-track')
      track.classList.remove('paused')
      track.classList.add('resume')

      const translateTrack = getComputedStyle(track)
        .transform
        .replace('matrix(', '')
        .replace(')', '')
        .split(',').filter(val => val < 0)[0]

      const resume = this.$refs.v_carousel.$el.querySelector('.slick-list')
        .style.cssText.split('--val-resume:')[1].split(';')[0]
        .split('translate3d(')[1].split(',')[0]

      const play = () => {
        track.classList.remove('resume')
        this.$refs.v_carousel.next()
        this.$refs.v_carousel.play()
      }

      setTimeout(() => {
        if (resume === translateTrack) {
          play()
        } else {
          setTimeout(play, 3000)
        }
      }, 3000)
    }
  }
}
</script>

<style lang="scss">
  ._v_carousel{
    .slick-track {
      @apply h-$close min-h-$close;
      transition: min-height 0.3s ease-in;

      >*{
        @apply bg-$primary;

        &:nth-child(2n){
          @apply bg-$bg;
        }

        >*{
          @apply h-full;
        }
      }

      &.paused{
        transform: var(--val-pause) !important;
        transition: var(--val-transition)!important;
      }
      &.resume{
        transform: var(--val-resume) !important;
        transition: var(--val-transition)!important;
      }
    }
    &.show .slick-track{
      @apply min-h-$open;
    }

    .slick-dots{
      @apply -bottom-55px pointer-events-none;
      li{
        @apply w-50px h-5px bg-$primary rounded-15px origin-center pointer-events-auto;
        width: calc(70vw / var(--list));
        background: rgba(151, 188, 213, 0.5);
        transition: all 0.3s ease-in-out;

        &.slick-active{
          width: calc(120vw / var(--list));
          background: #97BCD5;
        }

        button{
          @apply hidden;
          &::before{
            content: '';
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._v_carousel{
      .slick-track {
        @apply mb-50px;
        min-height: calc(var(--close));
        height: calc(var(--close));
      }
      &.show .slick-track{
        min-height: calc(var(--open) * 0.8);
      }

      .slick-dots{
        @apply hidden;
      }
      .slick-arrow {
        @apply top-auto -bottom-0px p-0 bg-transparent z-999;

        &.slick-next{
          @apply left-1/2 right-auto ml-10px;
        }
        &.slick-prev{
          @apply right-1/2 left-auto mr-10px;
        }
      }
    }
  }
</style>
