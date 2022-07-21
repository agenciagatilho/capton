<template>
  <main id="socios">
    <v-banner :item="socios.banner" cta="/" class="_banner_socios" />
    <v-container class="_partners">
      <div v-if="$device.isDesktop" class="_down_arrow" />
      <div v-else class="_down_dots">
        <span v-for="(item, index) in socios.partners" :key="'about_us_dots_'+index" />
      </div>
      <ul>
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
      </ul>
      <div class="_animated_arrow" />
    </v-container>
    <v-contact-form-socios id="contato" :item="socios.visionBeyound" />
  </main>
</template>

<script>
import socios from '@/data/ptbr/partners.json'
export default {
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
    const gsap = this.$gsap.base
    const ScrollTrigger = this.$gsap.ScrollTrigger

    const items = gsap.utils.toArray('._partners ._item')
    const dots = document.querySelectorAll('._down_dots span')
    const arrowMasked = document.querySelector('._partners ._animated_arrow')

    ScrollTrigger.create({
      trigger: document.querySelector('._partners'),
      start: 'top center',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (((self.end - self.start) * self.progress) - 140 > 0) {
          gsap.to(
            '._down_dots',
            {
              y: ((self.end - self.start) * self.progress) - 140
            }
          )
        } else {
          gsap.to(
            '._down_dots',
            {
              y: 0,
              duration: 1
            }
          )
        }
      }
    })

    items.forEach((item, index) => {
      if (this.$device.isDesktop) {
        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none reverse none',
          onEnter: () => {
            item.classList.add('enter')
          },
          onLeaveBack: () => {
            item.classList.remove('enter')
          }
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
      } else {
        ScrollTrigger.create({
          trigger: item,
          start: 'top center',
          end: 'center bottom',
          toggleActions: 'play none restart none',
          onEnter: () => {
            dots[index]?.classList.add('enter')
            item.classList.add('enter')
            dots.forEach((i) => { if (i !== dots[index]) { i.classList.remove('enter') } })
          },
          onLeaveBack: () => {
            item.classList.remove('enter')
            dots[index]?.classList.add('enter')
            dots.forEach((i) => { if (i !== dots[index]) { i.classList.remove('enter') } })
          }
        })
      }
    })
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
        ul{
          @apply flex flex-col gap-120px;

          ._item{
            @apply flex gap-55px pl-90px relative opacity-35;
            transition: opacity ease-in-out 1s;

            &.enter {
              @apply opacity-100;
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
          background-image: url('/images/background_banner.gif');
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
          ul{
            @apply flex flex-col gap-100px
                   overflow-x-auto overflow-y-hidden;
            grid-auto-flow: column;

            ._item{
              @apply gap-0px p-0 pl-0px relative flex-col items-center;

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
                @apply hidden;
              }
            }
            .slick-slide:nth-last-child(1){
              ._item::before{
                width: calc(65%)
              }
            }
          }

          ._down_dots{
            @apply absolute w-0 h-0 top-0 left-10px
                    flex flex-col;

            span{
              @apply relative w-5px h-10vh;
              transition: all ease-in-out .5s;
              margin: calc(3vh + 7px) 0;
              &::before{
                content: '';
                @apply top-1/2 w-5px h-6vh m-0 rounded-full
                      transform -translate-y-1/2
                      absolute top-0 left-0;
                background: #97BCD580;
                transition: all ease-in-out 1s;
              }

              &.enter{
                margin: calc(6vh + 7px) 0;
                &::before{
                  @apply h-12vh;
                  background: #97BCD5;
                }
              }
            }
          }

          ._down_arrow{
            @apply hidden;
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
