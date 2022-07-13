<template>
  <v-container id="header" element="header">
    <span class="_inner">
      <component :is="isButton('/')" class="not" to="/" @click="goToTop">
        <v-image src="logo_capton.svg" width="145px" height="22px" />
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
    </span>
  </v-container>
</template>

<script>
import sitemap from '@/data/sitemap.json'
export default {
  data () {
    return {
      sitemap,
      currentPosition: 0,
      timestamp: 0
    }
  },
  mounted () {
    window.addEventListener('scroll', (e) => {
      if (e.timeStamp > this.timestamp + 1000) {
        if (window.scrollY !== 0) {
          document.querySelector('#header').classList.add('offTop')
        } else {
          document.querySelector('#header').classList.remove('offTop')
        }

        if (window.scrollY > this.currentPosition) {
          document.querySelector('#header').classList.add('scrollBottom')
        } else {
          document.querySelector('#header').classList.remove('scrollBottom')
        }

        this.timeStamp = e.timeStamp
        this.currentPosition = window.scrollY
      }
    })
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
  #header{
    @apply fixed w-full h-70px text-16px text-$text-light z-998 transform;
    transition: all 0.2s ease-in-out;
    .container{
      @apply relative w-full h-full;
      ._inner{
        @apply absolute w-full h-full
               flex justify-between items-center;

        menu{
          @apply flex gap-50px;

          a,button{
            @apply px-21px pt-7px pb-6px font-semibold;

            &:nth-last-child(1){
              @apply bg-$primary rounded-15px text-$text;
            }
          }
        }
      }
    }

    &.scrollBottom{
      @apply -translate-y-1/1;

    }
    &.offTop:not(.scrollBottom){
      background: #d3e1eb2e;
    }

  }
</style>
