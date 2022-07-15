<template>
  <v-container class="_boosting_people_transforming_businesses">
    <span class="_content">
      <div class="_text">
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
      </div>
      <v-image src="images/impulsionando_pessoal.png" width="441px" height="431px" />
    </span>
    <hr>
    <span class="_items">
      <div class="_box">
        <v-image src="images/como_um_experiente_capitao.png" width="167px" height="172px" />
        <h3>{{ item.items.experience.title }}</h3>
        <p v-html="item.items.experience.description" />
      </div>
      <div class="_box">
        <v-image src="images/seguranca_e_estabilidade.png" width="167px" height="172px" />
        <h3>{{ item.items.security.title }}</h3>
        <p v-html="item.items.security.description" />
      </div>
    </span>
    <nuxt-link class="default_button" :to="sitemap.whoWeAre.url">
      {{ item.cta }}
    </nuxt-link>
  </v-container>
</template>

<script>
import sitemap from '@/data/sitemap.json'
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sitemap
    }
  }
}
</script>

<style lang="scss">
  ._boosting_people_transforming_businesses{
    .container{
      @apply flex flex-col gap-60px;

      ._content{
        @apply flex gap-90px items-center justify-between px-25px pl-75px;

        ._text{
          @apply flex flex-col gap-40px max-w-560px;
        }
      }
      hr{
        border-top: #093140 solid 1px;
        @apply opacity-50 pb-15px;
      }
      ._items{
        @apply grid grid-cols-2 gap-0px px-25px pl-75px;

        ._box{
          @apply flex flex-col gap-25px max-w-490px;

          img{
            @apply h-172px object-contain;
          }

          &:nth-child(1){
            h3{
              @apply max-w-485px;
            }
          }
          &:nth-child(2){
            @apply ml-auto;
            h3{
              @apply max-w-460px;
            }
          }
        }
      }
      .default_button{
        @apply w-max mx-auto px-40px;
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._boosting_people_transforming_businesses{
      .container{
        @apply gap-40px text-center;

        ._content{
          @apply flex-col-reverse gap-40px;

          ._text{
            @apply gap-40px max-w-560px;
          }
        }
        ._items{
          @apply grid-cols-1 gap-50px;

          ._box{
            @apply items-center;

            &:nth-child(2){
              h3{
                @apply max-w-460px;
              }
            }
          }
        }
        .default_button{
          @apply w-max mx-auto;
        }
      }
    }
  }
</style>
