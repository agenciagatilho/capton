<template>
  <VueSlickCarousel v-bind="settings" class="_v_carousel" :class="{'show': isShow}" :style="`--close: ${closeHeight}; --open: ${openHeight};`">
    <slot />
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import { useCarouselState } from '@/store/carouselState'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
// optional style for arrows & dots
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
        speed: 300,
        // focusOnSelect: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        variableWidth: true
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
  mounted () {
    console.log(this.state[this.name], this.name)
  }
}
</script>

<style lang="scss">
  ._v_carousel{
    .slick-track {
      @apply h-$close min-h-$close;
      transition: all 0.3s ease-in;

      >*{
        @apply bg-$primary;

        &:nth-child(2n){
          @apply bg-$bg;
        }

        >*{
          @apply h-full;
        }
      }
    }
    &.show .slick-track{
      @apply min-h-$open;
    }

    .slick-dots{
      @apply -bottom-55px;
      li{
        @apply w-50px h-5px bg-$primary rounded-15px origin-center;
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
</style>
