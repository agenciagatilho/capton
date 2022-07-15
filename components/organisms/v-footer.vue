<template>
  <div class="_footer">
    <v-container element="footer" id="footer">
      <div class="_top">
        <component :is="isButton('/')" class="not _logo" to="/" @click="goToTop">
          <v-image src="logo_capton.svg" width="204px" height="31px" />
        </component>

        <menu>
          <component
            :is="isButton(sitemap.whoWeAre.url)"
            class="not"
            :to="sitemap.whoWeAre.url"
            @click="goTo(sitemap.whoWeAre.url)"
          >
            {{ sitemap.whoWeAre.title }}
          </component>

          <component
            :is="isButton(sitemap.methodology.url)"
            class="not"
            :to="sitemap.methodology.url"
            @click="goTo(sitemap.methodology.url)"
          >
            {{ sitemap.methodology.title }}
          </component>

          <component
            :is="isButton(sitemap.investInGoodBusiness.url)"
            class="not"
            :to="sitemap.investInGoodBusiness.url"
            @click="goTo(sitemap.investInGoodBusiness.url)"
          >
            {{ sitemap.investInGoodBusiness.title }}
          </component>

          <component
            :is="isButton(sitemap.contact.url)"
            class="not"
            :to="sitemap.contact.url"
            @click="goTo(sitemap.contact.url)"
          >
            {{ sitemap.contact.title }}
          </component>
        </menu>

        <div class="_footer_arrow_background">
          <v-image src="footer_arrow_background.svg" width="364px" height="335px" />
        </div>

        <div class="_social_media">
          <p>{{ medias.title }}</p>
          <span>
            <!-- <a :href="medias.facebook">
              <v-image src="icons/facebook.svg" width="16px" height="23px" />
            </a> -->
            <a :href="medias.linkedin">
              <v-image src="icons/linkedin.svg" width="23px" height="21px" />
            </a>
            <a :href="medias.instagram">
              <v-image src="icons/instagram.svg" width="22px" height="26px" />
            </a>
          </span>
        </div>
      </div>
      <hr>
      <div class="_bottom">
        <nuxt-link :to="sitemap.privacy.url">
          {{ sitemap.privacy.title }}
        </nuxt-link>
        <a :href="sitemap.gatilho.url">
          {{ sitemap.gatilho.title }}
        </a>
      </div>
    </v-container>
  </div>
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
  },
  methods: {
    isButton (page) {
      const cleanPage = page.split('#')[0]
      if (this.$route.path !== cleanPage && page.split('#')[0]) {
        return 'nuxt-link'
      }
      return 'button'
    },
    goTo (id) {
      const resolveId = id.split('#')
      const element = document.getElementById(
        id.replace(resolveId[0] + '#', '')
      )

      scrollTo({
        behavior: 'smooth',
        top: element?.offsetTop
      })
    },
    goToTop () {
      scrollTo({
        behavior: 'smooth',
        top: 0
      })
    }
  }
}
</script>

<style lang="scss">
  ._footer{
    @apply pt-60px -mt-60px overflow-hidden;
    #footer{
      @apply py-50px bg-$secondary
             text-16px font-semibold text-$text-light;
      line-height: 18px;

      ._top{
        @apply grid grid-cols-4 pb-40px;

        ._logo{
          @apply h-max;
        }

        menu{
          @apply flex flex-col gap-10px my-0 h-max;

          a,button{
            @apply text-left font-semibold;
          }
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
  }

  @media screen and (max-width: 768px) {
    ._footer{
      @apply pt-0px -mt-0px text-center;
      #footer{
        ._top{
          @apply grid-cols-1 justify-items-center gap-30px pb-40px;

          ._logo{
          }

          menu{
            @apply gap-10px p-0;

            a,button{
              @apply text-center;
            }
          }

          ._footer_arrow_background{
            @apply hidden;
          }

          ._social_media{
            @apply mx-auto gap-20px;
            span{
              @apply flex gap-20px;
            }
          }

        }
        hr{
          @apply border-t-white;
        }
        ._bottom{
          @apply flex-col gap-20px pt-20px;
        }
      }
    }
  }
</style>
