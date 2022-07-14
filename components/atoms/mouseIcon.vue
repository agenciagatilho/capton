<template>
  <div class="mouse_icon">
    <v-image src="icons/mouse_icon.svg" />
    <v-image src="icons/arrow_mouse.svg" />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
  .mouse_icon{
    @apply w-29px flex flex-col items-center justify-center;

    >*{
      &:nth-child(1){
      }
      &:nth-child(2){
        @apply w-21px -mt-10px;
          animation: mouseArrow 2s ease infinite;
      }
    }
  }

  @keyframes mouseArrow {
    0%{
      transform: translate3d(0px, 0px, 0px);
    }
    50%{
      transform: translate3d(0px, -8px, 0px);
    }
    100%{
      transform: translate3d(0px, 0px, 0px);
    }
  }
</style>
