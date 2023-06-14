<template>
  <div class="_menu_button" @click="openMenu">
    <span />
    <span />
    <span />
  </div>
</template>

<script>
import { useMenuStore } from '~/store/menuState'
export default {
  data () {
    return {
      state: useMenuStore()
    }
  },
  methods: {
    openMenu () {
      this.state.show = !this.state.show
    }
  }
}
</script>

<style lang="scss">
._menu_button{
  @apply hidden;
}
@media screen and (max-width: 768px) {
  ._menu_button{
    @apply flex flex-col w-25px h-20px gap-5px;

    span{
      @apply h-2px rounded-full bg-$text;
    }
  }
}
</style>
