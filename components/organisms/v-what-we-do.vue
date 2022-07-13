<template>
  <v-container class="_what_we_do background_secondary">
    <h2>{{ item.title }}</h2>
    <span class="_items">
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
    </span>
  </v-container>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
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
        @apply flex;

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
</style>
