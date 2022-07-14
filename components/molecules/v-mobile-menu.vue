<template>
  <div class="_mobile_menu" :class="{'show': state.show}">
    <v-menu-button />
    <menu>
      <component :is="isButton('/')" class="not" to="/" @click="goToTop">
        <v-image src="logo_capton.svg" width="120px" height="19px" />
      </component>

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
  </div>
</template>

<script>
import sitemap from '@/data/sitemap.json'
import { useMenuStore } from '~/store/menuState'
export default {
  data () {
    return {
      state: useMenuStore(),
      sitemap
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
  ._mobile_menu{
    @apply hidden;
  }

  @media screen and (max-width: 768px) {
    ._mobile_menu{
      @apply fixed h-full w-60vw right-0 top-0 z-999
            bg-$bg-secondary py-25px px-15px
            flex flex-col gap-15px items-end
            transform translate-x-1/1
            pointer-events-none;
      transition: all 0.2s ease-in;

      &::before{
        content: '';
        @apply absolute w-0vw h-full right-1/1 top-0 bg-transparent z-1;
      }

      &.show{
        @apply translate-x-0 pointer-events-auto;

        &::before{
          @apply w-40vw h-full;
        }
      }

      menu{
        @apply p-0 m-0 flex flex-col items-end gap-15px;

        a, button{
          @apply text-right font-semibold;
        }
      }
    }
  }
</style>
