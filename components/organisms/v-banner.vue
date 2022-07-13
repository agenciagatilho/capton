<template>
  <v-container class="_v_banner">
    <h1>{{ item.title }}</h1>
    <p v-html="item.description" />
    <nuxt-link v-if="item.cta" class="default_button alt" :to="cta">
      {{ item.cta }}
    </nuxt-link>
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
    }
  }
}
</script>

<style lang="scss">
  ._v_banner{
    @apply bg-no-repeat bg-cover -mt-75px;
    .container{
      @apply relative h-100vh
              flex flex-col gap-40px
              justify-center
              text-$text-light;

      p{
        @apply max-w-598px;
      }
      .default_button{
        @apply w-max;
      }
      ._mouse_icon{
        @apply absolute left-0 bottom-40px;
      }
    }
  }
</style>
