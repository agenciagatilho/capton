<template>
  <v-container class="_transform_my_business">
    <div class="_text">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
    <form id="form_contact_home" @submit="submit">
      <v-input id="name" :placeholder="item.form.name" :maxlength="100" />
      <v-input id="email" :placeholder="item.form.email" type="email" :maxlength="255" />
      <v-input id="city" :placeholder="item.form.city" :maxlength="100" />
      <v-input id="operating" :placeholder="item.form.operating" :maxlength="100" />
      <v-input id="site" :placeholder="item.form.site" :maxlength="100" />
      <div class="_privacy">
        <p>{{ sitemap.privacy.title }}</p>
        <label>
          <input type="checkbox" name="accept_privacy">
          <div class="__box" />
          <a :href="sitemap.privacy.url" target="_blank">
            {{ item.form.accept_privacy }}
          </a>
        </label>
        <label>
          <input type="checkbox" name="accept_receive_email">
          <div class="__box" />
          {{ item.form.accept_receive_email }}
        </label>
      </div>
      <button type="submit">
        {{ item.form.send }}
      </button>
    </form>
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
  },
  methods: {
    submit (e) {
      e.preventDefault()
      const form = e.target

      const tags = []
      if (form.accept_receive_email.checked) { tags.push('aceitou envio de emails') }
      if (form.accept_privacy.checked) { tags.push('aceitou politica de privacidade') }

      const data = {
        conversion_identifier: 'contato_home_capton',
        name: form.name.value,
        email: form.email.value,
        city: form.city.value,
        website: form.site.value,
        cf_operating: form.operating.value,
        available_for_mailing: form.accept_receive_email.checked,
        tags,
        legal_bases: [
          {
            category: 'communications',
            type: 'consent',
            status: form.accept_privacy.checked ? 'granted' : 'declined'
          }
        ]
      }

      this.$api.send(data).then((res) => {
        if (res.ok) {
          this.$toast.set('Formulario enviado com sucesso!')
          form.reset()
        } else {
          this.$toast.set(`Erro ao enviar o formulario! <br> código:(${res.status})/ tipo:${res.type}`)
        }
      })
    }
  }
}
</script>

<style lang="scss">
  ._transform_my_business{
    .container{
      @apply grid grid-cols-2 gap-100px;

      h2{
        @apply max-w-440px;
      }

      ._text{
        @apply flex flex-col gap-40px max-w-510px;
      }

      #form_contact_home{
        @apply pl-10px flex flex-col gap-20px;

        ._privacy{
          @apply flex flex-col gap-10px
                 px-10px;

          p{
            @apply font-bold;
          }

          label{
            @apply text-16px;

            a{
              @apply underline;
            }
          }
        }

        button{
          @apply ml-auto w-max px-50px rounded-15px;
        }
      }
    }
  }

@media screen and (max-width: 768px) {
  ._transform_my_business{
    .container{
      @apply grid-cols-1 gap-30px;

      ._text{
        @apply gap-20px;
      }

      #form_contact_home{
        @apply gap-15px;

        button{
          @apply w-full;
        }
      }
    }
  }
}
</style>
