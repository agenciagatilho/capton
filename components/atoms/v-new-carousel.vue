<template>
  <section
    ref="splide"
    class="splide"
    :style="`--close: ${closeHeight}; --open: ${openHeight};`"
  >
    <div class="splide__arrows" />
    <div class="splide__slider">
      <div class="splide__track">
        <ul class="splide__list" :class="{'_v_show': isShow}">
          <slot />
        </ul>
      </div>
    </div>
  </section>
</template>

<script>
import Splide from '@splidejs/splide'
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll'
import { useCarouselState } from '@/store/carouselState'
import '@splidejs/splide/dist/css/splide-core.min.css'

export default {
  props: {
    closeHeight: {
      type: String,
      default: '300px'
    },
    openHeight: {
      type: String,
      default: '450px'
    },
    name: {
      type: String,
      required: true
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
    const splides = document.querySelectorAll('.splide')

    splides.forEach((item) => {
      if (!item.classList.contains('is-initialized')) {
        const splide = new Splide(item,
          this.$device.isDesktop
            ? {
                type: 'loop',
                drag: 'free',
                focus: 'center',
                perPage: 3,
                autoScroll: {
                  speed: 1
                }
              }
            : {
                type: 'loop',
                drag: true,
                focus: 'center',
                perPage: 1,
                autoScroll: {
                  speed: 0.5
                }
              }
        )

        splide.mount({ AutoScroll })
      }
    })
  }
}
</script>

<style lang="scss">
.splide{
  @apply visible;
  .splide__list {
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

    &._v_show{
      @apply min-h-$open;
    }
  }

  .splide__arrows{
    @apply hidden;
  }

  .splide__pagination {
    @apply gap-25px pointer-events-none;

    li button{
      @apply mt-40px p-0 h-4px bg-$primary rounded-15px origin-center pointer-events-auto;
      width: calc(50vw / var(--list));
      background: rgba(151, 188, 213, 0.5);
      transition: all 0.3s ease-in-out;

      &.is-active{
        width: calc(100vw / var(--list));
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
  .splide{
    .splide__list {
      &._v_show{
      }
    }

    .splide__arrows{
    }

    .splide__pagination {
      li button{
        &.is-active{
        }
        button{
          &::before{
          }
        }
      }
    }
  }
}
</style>
