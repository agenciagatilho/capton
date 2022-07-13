<template>
  <div ref="item_carousel_box" class="_item_carousel_box">
    <div class="_inner">
      <v-image v-if="image" :src="image.src" :width="image.width" :height="image.height" />
      <h3 v-if="title">
        {{ title }}
      </h3>
      <!-- <p v-if="description" v-html="typeText" /> -->
      <p v-if="description" v-html="description" v-show="show || !resume" />
      <p v-if="resume" v-html="resume" v-show="!show"/>
      <button v-if="resume" class="not" @click="openMenu">
        Ver mais
      </button>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from 'pinia'
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
      default: 'a'
    }
  },
  setup (app) {
    const state = useCarouselState()
    const show = storeToRefs(state)[app.name]
    return {
      show
    }
  },
  data () {
    return {
      state: useCarouselState(),
      controllerDescription: this.show ? this.description : this.resume
    }
  },
  computed: {
    typeText () {
      return this.resume ? this.controllerDescription : this.description
    }
  },
  watch: {
    show (newVal, oldVal) {
      if (newVal) {
        this.controllerDescription = this.description
      } else {
        this.controllerDescription = this.resume
      }
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
    ._inner{
      @apply p-40px overflow-hidden flex flex-col h-full gap-20px;
      transition: all 0.3s ease-in-out;

      p{
        @apply h-full;
      }

      button{
        @apply underline font-bold mt-auto;
      }
    }
  }
</style>
