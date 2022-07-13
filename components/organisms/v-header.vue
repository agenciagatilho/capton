<template>
  <v-container element="header" id="header">
    <span class="_inner">
      <nuxt-link to="/">
        <v-image src="logo_capton.svg" width="145px" height="22px" />
      </nuxt-link>

      <menu>
        <nuxt-link :to="sitemap.whoWeAre.url">
          {{ sitemap.whoWeAre.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.methodology.url">
          {{ sitemap.methodology.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.investInGoodBusiness.url">
          {{ sitemap.investInGoodBusiness.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.contact.url">
          {{ sitemap.contact.title }}
        </nuxt-link>
      </menu>
    </span>
  </v-container>
</template>

<script>
import sitemap from '@/data/sitemap.json'
export default {
  data () {
    return {
      sitemap
    }
  }
}
</script>

<style lang="scss">
  #header{
    @apply fixed w-full h-80px text-16px font-semibold text-$text-light z-998;
    .container{
      @apply relative w-full h-full;
      ._inner{
        @apply absolute w-full h-full
               flex justify-between items-center;

        menu{
          @apply flex gap-50px;

          a{
            @apply px-21px pt-7px pb-6px;

            &:nth-last-child(1){
              @apply bg-$primary rounded-15px text-$text;
            }
          }
        }
      }
    }
  }
</style>
