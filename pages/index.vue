<template>
  <main id="home">
    <v-banner :item="home.banner" class="_banner_home" cta="what_we_do" />

    <v-what-we-do :item="home.whatWeDo" id="what_we_do"/>

    <v-boosting-people-transforming-businesses :item="home.boostingPeopleTransformingBusinesses" />

    <v-container :nolimit="true" class="_first_focus_boost background_secondary">
      <span class="container">
        <h2 class="small">
          {{ home.firstFocusBoost.title }}
        </h2>
      </span>
      <v-carousel v-if="home.firstFocusBoost.items" class="_items" name="firstFocusBoost" :style="`--list: ${home.firstFocusBoost.items.length * 2};`">
        <item-carousel
          v-for="(item, index) in home.firstFocusBoost.items"
          :key="'focus_boost' + index"
          only
          name="firstFocusBoost"
          :description="item.full"
          :resume="item.resume"
        />
      </v-carousel>
      <span class="container">
        <button @click="goTo('metodologia')">
          {{ home.firstFocusBoost.cta }}
        </button>
      </span>
    </v-container>

    <v-banner id="metodologia" class="_actions_transform_market" :item="home.actionsTransformMarket" cta="about_us" goToCenter />

    <v-about-us id="about_us" :item="home.aboutUs" />

    <v-container id="invista-em-bons-negocios" nolimit class="_companies background_secondary">
      <v-carousel
        v-if="home.companies.items"
        class="_items"
        name="companies"
        close-height="450px"
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
      </v-carousel>
      <span class="container">
        <button @click="goTo('contato', true)">
          {{ home.companies.cta }}
        </button>
      </span>
    </v-container>

    <v-contact-form-home id="contato" :item="home.transformMyBusiness" />

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
  },
  methods: {
    goTo (id, center = false) {
      const element = document.getElementById(id)
      let position = 0

      if (center) {
        position = element?.offsetTop - 200
      } else {
        position = element?.offsetTop
      }
      scrollTo({
        behavior: 'smooth',
        top: position
      })
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

          button{
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
          ._inner{
            @apply pt-60px;
          }
        }

        .container{
          @apply w-full flex;
          button{
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

  @media screen and (max-width: 768px) {
    #home{
      @apply gap-50px text-center;

      ._banner_home{
        background-image: url('/images/background_banner.gif');
        @apply mt-0px;
      }

      ._first_focus_boost{
        ._item_carousel_box{
          @apply max-w-385px;
        }
        >*{
          @apply gap-30px;

          >.container{

            .default_button{
              @apply mt-30px;
            }
          }
        }
      }

      ._companies{
        >*{
          @apply gap-15px;

          ._item_carousel_box{
            @apply max-w-full;
          }

          .container{
            @apply w-full flex;
            button{
              @apply w-max mx-auto mt-0px;
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
          @apply grid-cols-1 gap-30px;

          ._text{
            @apply gap-15px max-w-full;

            h2{
              @apply max-w-full;
            }

            a{
              @apply w-full;
            }
          }
        }
      }

      ._capton_club{
        .container{
          @apply pt-30px pb-30px px-20px
                 flex flex-col gap-30px
                 mx-15px
                 rounded-30px;
          width: calc(100% - 30px);

          ._text{
            @apply grid grid-cols-1 gap-30px;

            p:nth-child(1) {
              @apply pr-0px;
            }
            p:nth-child(2) {
              @apply pl-0px;
            }
          }
        }
      }
    }
  }
</style>
