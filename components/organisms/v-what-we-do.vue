<template>
  <v-container class="_what_we_do background_secondary">
    <h2>{{ item.title }}</h2>
    <component :is="mobileElement" class="_items" v-bind="settings">
      <div class="_box">
        <v-image src="icons/investment.svg" width="40px" height="42px" />
        <h3>{{ item.items.investment.title }}</h3>
        <p v-html="item.items.investment.description" />
      </div>
      <div class="_box">
        <v-image src="icons/create.svg" width="29px" height="43px" />
        <h3>{{ item.items.create.title }}</h3>
        <p v-html="item.items.create.description" />
      </div>
      <div class="_box">
        <v-image src="icons/boost.svg" width="41px" height="41px" />
        <h3>{{ item.items.boost.title }}</h3>
        <p v-html="item.items.boost.description" />
      </div>
    </component>
  </v-container>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      settings: {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 300,
        slidesToScroll: 1,
        slidesToShow: 1,
        variableWidth: true,
        centerMode: true
      }
    }
  },
  computed: {
    mobileElement () {
      return this.$device.isDesktop ? 'span' : 'VueSlickCarousel'
    }
  }
}
</script>

<style lang="scss">
  ._what_we_do{
    @apply mb-0px;
    .container{
      @apply flex flex-col gap-40px
              items-center;

      ._items{
        @apply grid grid-cols-3;

        ._box{
          @apply flex flex-col gap-20px
                  p-60px bg-$bg;
          transition: all 0.3s ease-in-out;

          p{
            @apply mt-6px;
          }

          &:hover{
            @apply bg-$primary;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._what_we_do{
      .container{
        @apply block text-center gap-30px;

        h2{
          @apply mb-30px;
        }

        ._items{
          @apply grid-cols-1 max-h-360px;

          .slick-slide{
            @apply h-full ;
            >div{
              @apply h-100vw max-h-400px;

              ._box{
                @apply py-25px px-15px h-full max-w-70vw text-center;
                transition: all 0.2s ease-in-out;

                >*{
                  @apply mb-20px mx-auto;
                }

                p{
                  @apply mt-6px;
                }

                &:hover{
                  @apply bg-$bg;
                }
              }
            }

            &.slick-active{
               >div{
                ._box{
                  @apply bg-$primary;
                }
               }
            }
          }
        }

        .slick-arrow {
          @apply top-auto -bottom-50px p-0 bg-transparent;
          display: none !important;

          &.slick-next{
            @apply left-1/2 right-auto ml-10px;
          }
          &.slick-prev{
            @apply right-1/2 left-auto mr-10px;
          }
        }
      }
    }
  }
</style>
