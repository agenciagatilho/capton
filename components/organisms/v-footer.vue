<template>
  <v-container element="footer" id="footer">
    <div class="_top">
      <nuxt-link to="/">
        <v-image src="logo_capton.svg" width="204px" height="31px" />
      </nuxt-link>

      <menu>
        <nuxt-link :to="sitemap.whoWeAre.url">
          {{ sitemap.whoWeAre.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.investInGoodBusiness.url">
          {{ sitemap.investInGoodBusiness.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.methodology.url">
          {{ sitemap.methodology.title }}
        </nuxt-link>
        <nuxt-link :to="sitemap.contact.url">
          {{ sitemap.contact.title }}
        </nuxt-link>
      </menu>

      <div class="_footer_arrow_background">
        <v-image src="footer_arrow_background.svg" width="364px" height="335px" />
      </div>

      <div class="_social_media">
        <p>{{ medias.title }}</p>
        <span>
          <nuxt-link :to="medias.facebook">
            <v-image src="icons/facebook.svg" width="16px" height="23px" />
          </nuxt-link>
          <nuxt-link :to="medias.linkedin">
            <v-image src="icons/linkedin.svg" width="23px" height="21px" />
          </nuxt-link>
          <nuxt-link :to="medias.instagram">
            <v-image src="icons/instagram.svg" width="22px" height="26px" />
          </nuxt-link>
        </span>
      </div>
    </div>
    <hr>
    <div class="_bottom">
      <nuxt-link :to="sitemap.whoWeAre.url">
        {{ sitemap.whoWeAre.title }}
      </nuxt-link>
      <nuxt-link :to="sitemap.investInGoodBusiness.url">
        {{ sitemap.investInGoodBusiness.title }}
      </nuxt-link>
    </div>
  </v-container>
</template>

<script>
import sitemap from '@/data/sitemap.json'
import medias from '@/data/medias.json'
export default {
  data () {
    return {
      sitemap,
      medias
    }
  }
}
</script>

<style lang="scss">
  #footer{
    @apply py-50px bg-$secondary text-16px font-semibold text-$text-light;
    line-height: 18px;

    ._top{
      @apply grid grid-cols-4 pb-40px;

      menu{
        @apply flex flex-col gap-10px my-0 h-max;
      }

      ._footer_arrow_background{
        @apply -mt-200px h-280px
               transform translate-y-97px;
        img{
          @apply absolute bottom-0 left-0 w-full h-full;
        }
      }

      ._social_media{
        @apply flex flex-col ml-auto gap-20px;
        span{
          @apply flex gap-20px;
        }
      }

    }
    hr{
      @apply border-t-white;
    }
    ._bottom{
      @apply flex justify-between pt-20px;
    }
  }
</style>
