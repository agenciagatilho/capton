<template>
  <main id="socios">
    <v-banner :item="socios.banner" cta="/" class="_banner_socios" />
    <v-container class="_partners">
      <div class="_down_arrow" />
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
    </v-container>
    <v-contact-form-socios id="contato" :item="socios.visionBeyound" />
  </main>
</template>

<script>
import socios from '@/data/ptbr/partners.json'
export default {
  data () {
    return {
      socios
    }
  },
  mounted () {
    const gsap = this.$gsap.base

    const items = gsap.utils.toArray('._partners ._item')
    const arrowDown = document.querySelector('._partners ._down_arrow')

    items.forEach((item, index) => {
      gsap.set(item, {
        opacity: 0.4
      })
      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'center center',
          end: 'top center',
          toggleActions: 'play none reverse none'
        }
      }).to(item, {
        opacity: 1,
        duration: 0.4,
        ease: 'ease'
      })

      gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'center center',
          end: 'top center',
          toggleActions: 'play none reverse none'
        }
      }).to(arrowDown, {
        y: item.offsetTop + item.children[1].offsetTop - 60,
        duration: 0.5,
        ease: 'ease'
      })
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
      @apply pb-75px;
      .container{
        @apply relative flex flex-col gap-150px pt-75px;
        ul{
          @apply flex flex-col gap-120px;

          ._item{
            @apply flex gap-70px pl-100px relative;

            &:nth-child(1){
              opacity: 1 !important;
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
                absolute -left-0px top-162px z-2
                bg-no-repeat bg-cover;
          background-image: url('/images/arrow_down.png');
        }
      }
    }

    #contato{
     >*{
       @apply px-100px;
     }
    }
  }
</style>
