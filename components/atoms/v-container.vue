<template>
  <component class="outer_container" :is='element' :class="{'bg-size': background}">
    <div :class="{'small': small, 'container': !nolimit}">
      <slot></slot>
    </div>
    <masked-background v-if="background" :src="background.src" :color="background.color" />
  </component>
</template>

<script>
export default {
  props: {
    small: {
      type: Boolean,
      default: false
    },
    element: {
      type: String,
      default: 'section'
    },
    nolimit: {
      type: Boolean,
      default: false
    },
    background: {
      type: Object || null,
      default: null
    }
  }
}
</script>

<style lang="scss">
  .outer_container{
    &.background_secondary{
      @apply bg-$bg-secondary py-75px -mt-75px;
    }

    &.bg-size{
      @apply relative;

      .container{
        @apply relative z-2;
      }
    }

    .container{
      @apply max-w-1200px mx-auto;
    }
    .container.small{
      @apply max-w-900px;
    }
  }

  @media (max-width: 768px) {
    .outer_container{
      &.background_secondary{
        @apply py-50px -mt-50px;
      }

      .container{
        @apply px-15px max-w-400px mx-auto;
      }
      .container.small{
        @apply max-w-300px;
      }
    }
  }
</style>
