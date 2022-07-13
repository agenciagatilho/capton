<template>
  <main id="home">
    <v-banner :item="home.banner" cta="/" class="_banner_home" />

    <v-what-we-do :item="home.whatWeDo" />

    <v-boosting-people-transforming-businesses :item="home.boostingPeopleTransformingBusinesses" />

    <v-container :nolimit="true" class="_first_focus_boost background_secondary">
      <span class="container">
        <h2 class="small">
          {{ home.firstFocusBoost.title }}
        </h2>
      </span>
      <v-carousel v-if="home.firstFocusBoost.items" class="_items" name="firstFocusBoost" :style="`--list: ${home.firstFocusBoost.items.length * 2};`">
        <item-carousel v-for="(item, index) in home.firstFocusBoost.items" :key="'focus_boost' + index" name="firstFocusBoost" :description="item.full" :resume="item.resume" />
        <item-carousel v-for="(item, index) in home.firstFocusBoost.items" :key="'focus_boost' + index" name="firstFocusBoost" :description="item.full" :resume="item.resume" />
      </v-carousel>
      <span class="container">
        <nuxt-link class="default_button" to="/">
          {{ home.firstFocusBoost.cta }}
        </nuxt-link>
      </span>
    </v-container>

    <v-banner class="_actions_transform_market" :item="home.actionsTransformMarket" cta="/" />

    <v-about-us :item="home.aboutUs" />

    <v-container nolimit class="_companies background_secondary">
      <v-carousel
        v-if="home.companies.items"
        class="_items"
        name="companies"
        close-height="400px"
        open-height="500px"
        :style="`--list: 8;`"
      >
        <item-carousel
          :image="{src: 'icons/indexed.svg', width: '40px', height: '40px'}"
          :title="home.companies.items.indexed.title"
          :description="home.companies.items.indexed.description"
          :resume="home.companies.items.indexed.resume"
          name="companies"
        />
        <item-carousel
          :image="{src: 'icons/accompanied.svg', width: '40px', height: '40px'}"
          :title="home.companies.items.accompanied.title"
          :description="home.companies.items.accompanied.description"
          :resume="home.companies.items.accompanied.resume"
          name="companies"
        />
        <item-carousel
          :image="{src: 'icons/boosted.svg', width: '40px', height: '40px'}"
          :title="home.companies.items.boosted.title"
          :description="home.companies.items.boosted.description"
          :resume="home.companies.items.boosted.resume"
          name="companies"
        />
        <item-carousel
          :image="{src: 'icons/investee.svg', width: '40px', height: '40px'}"
          :title="home.companies.items.investee.title"
          :description="home.companies.items.investee.description"
          :resume="home.companies.items.investee.resume"
          name="companies"
        />
        <item-carousel
          :image="{src: 'icons/indexed.svg', width: '40px', height: '40px'}"
          :title="home.companies.items.indexed.title"
          :description="home.companies.items.indexed.description"
          :resume="home.companies.items.indexed.resume"
          name="companies"
        />
      </v-carousel>
      <span class="container">
        <nuxt-link class="default_button" to="/">
          {{ home.companies.cta }}
        </nuxt-link>
      </span>
    </v-container>

    <v-contact-form-home :item="home.transformMyBusiness" />

    <v-container class="_investors_challenger">
      <v-image src="/images/investidores_que_desafiam.png" />
      <div class="_text">
        <h2>{{ home.investorsChallenger.title }}</h2>
        <p v-html="home.investorsChallenger.description" />
        <nuxt-link to="/" class="default_button">
          {{ home.investorsChallenger.cta }}
        </nuxt-link>
      </div>
    </v-container>

    <v-container class="_capton_club">
      <h3>{{ home.captonClub.title }}</h3>
      <span class="_text">
        <p v-for="(text, index) in home.captonClub.description" :key="'capton_club_' + index" v-html="text" />
      </span>
    </v-container>
  </main>
</template>

<script>
import home from '@/data/ptbr/home.json'
export default {
  data () {
    return {
      home
    }
  }
}
</script>

<style lang="scss">
  #home{
    @apply flex flex-col gap-75px;

    ._banner_home{
      background-image: url('/images/background_banner.gif');
      @apply mt-0px;
    }

    ._first_focus_boost{
      @apply my-0;
      ._item_carousel_box{
        @apply max-w-385px;
      }
      >*{
        @apply flex flex-col gap-40px;

        >.container{
          @apply flex items-center;

          .default_button{
            @apply w-max mx-auto mt-40px;
          }
        }
      }
    }

    ._actions_transform_market{
      background-image: url('/images/background_banner_2.gif');
    }

    ._companies{
      @apply my-0 pt-0;
      >*{
        @apply flex flex-col gap-40px;

        ._item_carousel_box{
          @apply max-w-385px text-16px;
          line-height: 24px;
        }

        .container{
          @apply w-full flex;
          .default_button{
            @apply w-max mx-auto mt-40px;
          }
        }
      }
      .slick-track {
        >*{
          &:nth-child(2n){
            background-color: #EFF6FF;
          }
        }
      }
    }

    ._investors_challenger{
      .container{
        @apply grid grid-cols-2 gap-60px;

        ._text{
          @apply flex flex-col gap-40px justify-center
                 max-w-480px;

          h2{
            @apply max-w-425px;
          }

          a{
            @apply w-max;
          }
        }
      }
    }

    ._capton_club{
      .container{
        @apply pt-40px pb-30px px-100px bg-$bg-secondary rounded-40px;
        @apply flex flex-col gap-30px;

        ._text{
          @apply grid grid-cols-2;

          p:nth-child(1) {
            @apply pr-100px;
          }
          p:nth-child(2) {
            @apply pl-50px;
          }
        }
      }
    }
  }
</style>
