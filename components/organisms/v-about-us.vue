<template>
  <v-container class="_about_us">
    <span>
      <div v-if="$device.isDesktop" class="_down_arrow" />
      <div v-else class="_down_dots">
        <span v-for="(item, index) in item.items" :key="'about_us_dots_'+index" />
      </div>
      <ul>
        <li v-for="(item, index) in item.items" :key="'about_us_'+index" class="_item">
          <h2>{{ 3 > index ? `${index + 1}.`: '' }} {{ item.title }}</h2>
          <p>{{ item.description }}</p>
        </li>
      </ul>
      <div class="_animated_arrow" />
    </span>
    <button @click="goTo('contato', true)">
      {{ item.cta }}
    </button>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      boxSize: 0,
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

    const items = gsap.utils.toArray('._about_us ._item')
    const dots = document.querySelectorAll('._down_dots span')
    const arrowMasked = document.querySelector('._about_us ._animated_arrow')

    ScrollTrigger.create({
      trigger: document.querySelector('._about_us'),
      start: 'top center',
      end: 'bottom bottom',
      onUpdate: (self) => {
        if (((self.end - self.start) * self.progress) - 120 > 0) {
          gsap.to(
            '._down_dots',
            {
              y: ((self.end - self.start) * self.progress) - 120
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
          toggleActions: 'restart none reverse none',
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
      } else {
        const animOpacity = gsap.fromTo(item,
          {
            opacity: 0.4 / index
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
          end: 'center bottom',
          toggleActions: 'play none restart none',
          animation: animOpacity,
          onEnter: () => {
            dots[index]?.classList.add('enter')
            dots.forEach((i) => { if (i !== dots[index]) { i.classList.remove('enter') } })
          },
          onLeaveBack: () => {
            dots[index]?.classList.add('enter')
            dots.forEach((i) => { if (i !== dots[index]) { i.classList.remove('enter') } })
          }
        })
      }
    })
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
  ._about_us{
    .container{
      @apply relative flex flex-col gap-150px pt-75px;
      >span{
        @apply flex;
      }
      ul{
        @apply flex flex-col gap-75px;

        ._item{
          @apply flex flex-col gap-40px justify-center
                 pl-65px relative
                 min-h-300px;
          scroll-snap-align: top;

          h2{
            @apply max-w-500px;
          }
          p{
            @apply max-w-590px;
          }

          &:nth-child(1) {
            opacity: 1 !important;
            transform: none !important;
            h2{
              @apply max-w-550px;
            }
          }
          &:nth-child(2) p{
            @apply max-w-630px;
          }
          &:nth-last-child(1){
            h2{
              @apply max-w-700px;
            }
            p{
              @apply max-w-610px;
            }
          }

          &::before{
            content: '';
            background: rgba(0, 63, 242, 0.5);
            height: calc(100% + 150px);
            @apply absolute left-0 top-0
                    w-2px -mt-75px;
          }
        }
      }

      ._down_arrow{
        @apply w-38px h-38px
              sticky -mr-21px mt-100px top-1/3 z-1
              bg-no-repeat bg-cover;
        background-image: url('/images/arrow_down.png');
      }

      ._animated_arrow{
        @apply w-200px h-200px mt-70px mr-0px ml-auto
              sticky right-0 top-1/4 z-1
              bg-no-repeat bg-cover;
        background-image: url('/images/masked_arrow_background.gif');
        mask: no-repeat center url('/images/masked_arrow_mask.png');
        -webkit-mask: no-repeat center url('/images/masked_arrow_mask.png');
        mask-size: contain;
        -webkit-mask-size: contain;
      }
    }
    button{
      @apply w-max mx-auto;
    }
  }

  @media screen and (max-width: 768px) {
    ._about_us{
      @apply mt-40px mb-80px;
      .container{
        @apply gap-40px pt-0px px-0;
        >span{
          @apply block;
        }
        ul{
          @apply gap-80px;
          ._item{
            @apply gap-40px pl-0px w-90vw pt-0px justify-start mx-auto min-h-0px;

            >*{
              @apply px-15px;
            }

            h2{
              @apply max-w-500px mb-0px;
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
            margin: calc(5vh + 7px) 0;
            &::before{
              content: '';
              @apply top-1/2 w-5px h-10vh m-0 rounded-full
                     transform -translate-y-1/2
                     absolute top-0 left-0;
              background: #97BCD580;
              transition: all ease-in-out 1s;
            }

            &.enter{
              margin: calc(10vh + 7px) 0;
              &::before{
                @apply h-20vh;
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
      button{
        @apply w-max mx-auto;
      }
      .slick-arrow {
        display: none !important;
      }
    }
  }
</style>
