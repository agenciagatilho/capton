<template>
  <main id="politica-de-privacidade">
    <v-container small>
      <div class="_text" v-html="privacy" />
    </v-container>
  </main>
</template>

<script>
import privacy from '~/data/ptbr/politica-de-privacidade'
export default {
  data () {
    return {
      privacy
    }
  }
}
</script>

<style lang="scss">
  #politica-de-privacidade{
    @apply mt-100px;

    h1{
      @apply text-48px font-black  my-40px;
      line-height: 56px;
    }
    h2{
      @apply text-36px font-black my-40px;
      line-height: 42px;
    }
    ul{
      @apply pl-20px list-disc mb-20px;

      ul{
        @apply mb-0px;
      }
    }
    p,li{
      @apply text-20px;
      line-height: 26px;
    }
  }

  @media screen and (max-width: 768px) {
    #politica-de-privacidade{
      @apply mt-100px;

      h1{
        @apply text-36px my-25px;
        line-height: 42px;
      }
      h2{
        @apply text-28px my-25px;
        line-height: 36px;
      }
      ul{
        @apply pl-15px mb-15px;

        ul{
          @apply mb-0px;
        }
      }
      p,li{
        @apply text-20px;
        line-height: 26px;
      }
    }
  }
</style>
