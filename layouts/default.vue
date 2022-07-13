<template>
  <div id="body">
    <v-header />
    <Nuxt />
    <v-footer />
    <BaseToast />
  </div>
</template>

<script>
// import footer from '@/data/ptbr/footer.json'
// import social from '@/data/ptbr/social_medias.json'
export default {
  data () {
    return {
      // footer,
      // social
    }
  }
}
</script>

<style lang="scss">
  #body{
    @apply flex flex-col bg-$bg gap-125px;
  }
  #toasts{
    @apply top-0 left-1/2;
  }

  @media screen and (max-width: 768px) {
    #body{
      @apply relative;
    }
  }
</style>
