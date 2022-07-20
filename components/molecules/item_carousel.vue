<template>
  <div ref="item_carousel_box" class="_item_carousel_box">
    <div class="_inner" :class="{'only': only}">
      <v-image v-if="image" :src="image.src" :width="image.width" :height="image.height" />
      <h3 v-if="title">
        {{ title }}
      </h3>
      <div class="_desc">
        <p v-if="description" v-html="description" :class="{'show': state[this.name] || !resume}" />
        <p v-if="resume" v-html="resume" :class="{'show': !state[this.name]}" />
      </div>
      <button v-if="resume" class="not" @click="openMenu">
        {{ this.state[this.name] ? 'Ver menos' : 'Ver mais' }}
      </button>
    </div>
  </div>
</template>

<script>
import { useCarouselState } from '@/store/carouselState'

export default {
  props: {
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    resume: {
      type: String,
      default: null
    },
    image: {
      type: Object,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    only: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      state: useCarouselState()
    }
  },
  methods: {
    openMenu () {
      this.state[this.name] = !this.state[this.name]
    }
  }
}
</script>

<style lang="scss">
  ._item_carousel_box{
    @apply h-full;
    ._inner{
      @apply p-40px overflow-hidden grid w-385px h-full gap-0px;
      grid-template-rows: max-content max-content 1fr max-content;
      transition: all 0.3s ease-in-out;

      h3{
        @apply py-15px;
      }
      ._desc{
        @apply relative;
        p{
          @apply absolute w-full h-full top-0 left-0
                 opacity-0 overflow-hidden max-h-0px
                 transform origin-center
                 pointer-events-none;
          transition: all 0.5s ease-in-out;

          &.show{
            @apply opacity-100 max-h-500px
                   pointer-events-auto;
          }
        }
      }

      button{
        @apply underline font-bold mt-auto mr-auto;
      }

      &.only{
        grid-template-rows: 1fr max-content;
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._item_carousel_box{
      @apply h-full;
      ._inner{
        @apply p-30px w-full h-full gap-20px;
        grid-template-rows: 10% 10% 50% 5%;

        svg{
          @apply mx-auto;
        }

        &.only{
          grid-template-rows: 1fr 5%;
        }
      }
    }
  }
</style>
