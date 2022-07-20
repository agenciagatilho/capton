<template>
  <main id="socios">
    <v-banner :item="socios.banner" cta="/" class="_banner_socios" />
    <v-container class="_partners">
      <div class="_down_arrow" />
      <component :is="$device.isDesktop ? 'ul' : 'VueSlickCarousel'" v-bind="settings">
        <li v-for="(item, index) in socios.partners" :key="'partners_'+index" class="_item">
          <span class="_img">
            <v-image :src="`images/socios/${item.name}.png`" width="127px" height="127px" />
          </span>
          <div class="_text">
            <h2>{{ item.title }}</h2>
            <a :href="item.linkedin">{{ item.role }}</a>
            <p v-html="item.description" />
          </div>
        </li>
      </component>
      <div class="_animated_arrow" />
    </v-container>
    <v-contact-form-socios id="contato" :item="socios.visionBeyound" />
  </main>
</template>

<script>
import VueSlickCarousel from 'vue-slick-carousel'
import socios from '@/data/ptbr/partners.json'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import 'vue-slick-carousel/dist/vue-slick-carousel-theme.css'
export default {
  components: {
    VueSlickCarousel
  },
  data () {
    return {
      socios,
      settings: {
        dots: false,
        arrows: false,
        infinite: false,
        speed: 300,
        slidesToScroll: 1,
        slidesToShow: 1
      }
    }
  },
  mounted () {
    if (this.$device.isDesktop) {
      const gsap = this.$gsap.base
      const ScrollTrigger = this.$gsap.ScrollTrigger

      const items = gsap.utils.toArray('._partners ._item')
      const arrowMasked = document.querySelector('._partners ._animated_arrow')

      items.forEach((item, index) => {
        const animOpacity = gsap.fromTo(item,
          {
            opacity: 0.4
          },
          {
            opacity: 1,
            y: 0,
            duration: 1
          }
        )

        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
          animation: animOpacity
        })

        const animRotate = gsap.fromTo(arrowMasked,
          {
            rotation: 0
          },
          {
            rotation: 360,
            duration: 0.7
          }
        )

        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
          animation: animRotate
        })
      })
    }
  }
}
</script>

<style lang="scss">
  #socios{
    @apply flex flex-col gap-75px;

    ._banner_socios{
      background-image: url('/images/background_socios.png');
      @apply mt-0px;
      h1{
        @apply max-w-635px;
      }
    }

    ._partners{
      @apply pb-150px;
      .container{
        @apply relative flex gap-0px pt-75px;
        ul, .slick-slider{
          @apply flex flex-col gap-120px;

          ._item{
            @apply flex gap-55px pl-90px relative;

            &:nth-child(1){
              opacity: 1 !important;
              transform: none !important;
            }

            ._img{
              @apply bg-no-repeat bg-contain w-230px h-210px
                     flex flex-col items-end justify-center;
              background-image: url('/images/socios/bg_partner_item.png')
            }

            ._text{
              @apply flex flex-col gap-8px;
              h2{
                @apply max-w-600px font-bold;
              }
              a{
                @apply mb-20px flex gap-8px items-center;

                &::before{
                  content: '';
                  @apply w-14px h-14px flex mb-3px;
                  background-image: url('/linkedin.svg');
                }
              }
              p{
                @apply max-w-590px;
              }
            }

            &:nth-child(2) p{
              @apply max-w-610px;
            }
            &:nth-child(3) p{
              @apply max-w-615px;
            }
            &:nth-child(5) p{
              @apply max-w-645px;
            }

            &::before{
              content: '';
              background: rgba(0, 63, 242, 0.5);
              height: calc(100% + 150px);
              @apply absolute left-18px top-0
                      w-2px -mt-75px;
            }
          }
        }

        ._down_arrow{
          @apply w-38px h-38px
                sticky mt-80px -mr-38px top-180px z-2
                bg-no-repeat bg-cover;
          background-image: url('/images/arrow_down.png');
        }
        ._animated_arrow{
          @apply w-100px h-100px mr-10px mt-40px ml-auto
                sticky right-0 top-150px z-1
                bg-no-repeat bg-cover;
          background-image: url('/images/masked_arrow_background.gif');
          mask: no-repeat center url('/images/masked_arrow_mask.png');
          -webkit-mask: no-repeat center url('/images/masked_arrow_mask.png');
          mask-size: contain;
          -webkit-mask-size: contain;
        }
      }
    }

    #contato{
     >*{
       @apply px-100px;
     }
    }
  }

  @media screen and (max-width: 768px) {
    #socios{
      @apply text-center gap-25px;

      ._partners{
        @apply pb-100px pt-50px;
        .container{
          @apply p-0px;
          .slick-slider{
            @apply block grid-rows-1
                   gap-100px
                   overflow-x-auto overflow-y-hidden;
            grid-auto-flow: column;

            ._item{
              @apply gap-70px p-0 pt-50px pl-0px relative items-center;

              &:nth-child(1){
                opacity: 1 !important;
                transform: none !important;
              }

              ._img{
                @apply bg-no-repeat bg-contain w-230px h-210px mx-auto mb-45px
                      flex flex-col items-end justify-center;
                background-image: url('/images/socios/bg_partner_item.png')
              }

              ._text{
                @apply flex flex-col gap-4px w-4/5 mx-auto;
                h2{
                  @apply max-w-600px font-bold;
                }
                a{
                  @apply mb-20px flex gap-8px items-center justify-center;

                  &::before{
                    content: '';
                    @apply w-14px h-14px flex mb-3px;
                    background-image: url('/linkedin.svg');
                  }
                }
                p{
                  @apply max-w-590px;
                }
              }

              &::before{
                width: calc(100% + 20vw + 100px);
                @apply absolute -left-0 top-0
                        h-2px -mt-0px -ml-10vw;
              }
            }
          }

          ._down_arrow{
            @apply w-30px h-30px transform rotate-z-90
                  absolute mt-0px -mr-0px -mt-9px left-1/2 -top-3px z-2
                  bg-no-repeat bg-contain;
            background-image: url('/images/arrow_down.png');
          }
          ._animated_arrow{
            @apply hidden;
          }
        }
      }

      #contato{
        >*{
          @apply px-15px;

          p{
            @apply m-0;
          }

          form{
            @apply p-0;
          }
        }
      }

      .slick-arrow {
        display: none !important;
      }
    }
  }
</style>
