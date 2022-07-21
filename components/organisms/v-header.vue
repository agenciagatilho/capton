<template>
  <v-container id="header" element="header" :class="{'fixedBackground': state.fixedBG}">
    <span class="_inner">
      <component :is="isButton('/')" class="not" to="/" @click="goToTop">
        <v-image src="logo_capton.svg" width="145px" height="22px" />
      </component>

      <v-menu-button />

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
import { useMenuStore } from '~/store/menuState'
export default {
  data () {
    return {
      sitemap,
      currentPosition: 0,
      timestamp: 0,
      state: useMenuStore()
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

    &::before{
      content: '';
      background-image: url('/images/background_header.gif');
      transition: all 0.2s ease-in-out;
      @apply absolute w-full h-full top-0 left-0 -z-1 opacity-0
             bg-no-repeat bg-center bg-cover;
    }

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

      ._menu_button{
        span{
          @apply bg-$text-light;
        }
      }
    }

    &.offTop:not(.scrollBottom),
    &.fixedBackground{
      &::before{
        @apply opacity-100;
      }
    }
  }

  @media screen and (max-width: 768px) {
    #header{
      .container{
        ._inner{
          @apply w-full justify-between relative;
          menu{
            @apply hidden;
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
  }
</style>
