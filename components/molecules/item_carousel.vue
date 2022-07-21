<template>
  <div ref="item_carousel_box" class="_item_carousel_box" :class="{'uniq': uniqState}">
    <div class="_inner" :class="{'only': only}">
      <v-image v-if="image" :src="image.src" :width="image.width" :height="image.height" />
      <h3 v-if="title">
        {{ title }}
      </h3>
      <div class="_desc">
        <p v-if="description" :class="{'show': state[name] || !resume}" v-html="computedDescription" />
        <p v-if="resume" :class="{'show': !state[name]}" v-html="resume" />
      </div>
      <button v-if="resume" class="not" @click="openMenu">
        {{ state[name] ? 'Ver menos' : 'Ver mais' }}
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
      state: useCarouselState(),
      uniqState: false
    }
  },
  computed: {
    computedDescription () {
      return this.$device.isDesktop
        ? this.description
        : this.description.replace(this.resume, '')
    }
  },
  methods: {
    openMenu () {
      this.state[this.name] = !this.state[this.name]
      this.uniqState = !this.uniqState
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
      @apply h-full transform rotate-y-0;
      transition: transform 0.5s cubic-bezier(0.455, 0.030, 0.515, 0.955);
      ._inner{
        @apply p-30px w-full h-full gap-20px;
        grid-template-rows: 10% 10% 50% 5%;

        p{
          transition: all 0.2s ease-in-out;
        }

        svg{
          @apply mx-auto;
        }
        button{
          @apply mx-auto;
        }

        &.only{
          grid-template-rows: 1fr max-content;
        }
      }
    }
  }
</style>
