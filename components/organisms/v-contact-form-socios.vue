<template>
  <v-container class="_vision_beyound">
    <div class="_text">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
    <form id="form_contact_socios" @submit="submit">
      <v-input :placeholder="item.form.name" id="name" :maxlength="100" />
      <v-input :placeholder="item.form.email" id="email" type="email" :maxlength="255" />
      <v-input :placeholder="item.form.city" id="city" :maxlength="100" />
      <v-input :placeholder="item.form.company" id="company" :maxlength="100" />
      <v-input :placeholder="item.form.message" id="message" type="textarea" :maxlength="2550" :rows="4" />
      <div class="_privacy">
        <p>{{ sitemap.privacy.title }}</p>
        <label>
          <input type="checkbox" name="accept_privacy">
          <a :href="sitemap.privacy.url" target="_blank">{{ item.form.accept_privacy }}</a>
        </label>
        <label>
          <input type="checkbox" name="accept_receive_email">
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
        conversion_identifier: 'contato_socios_capton',
        name: form.name.value,
        email: form.email.value,
        city: form.city.value,
        company_name: form.company.value,
        cf_mensagem: form.message.value,
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
  ._vision_beyound{
    .container{
      @apply grid grid-cols-2 gap-0px;

      ._text{
        @apply flex flex-col gap-40px;

        p{
          @apply -mr-10px;
        }
      }

      #form_contact_socios{
        @apply pl-100px flex flex-col gap-20px;

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
    ._vision_beyound{
      .container{
        @apply grid grid-cols-1 gap-50px;

        ._text{
          @apply flex flex-col gap-40px;
        }

        #form_contact_socios{
          @apply pl-10px flex flex-col gap-20px;

          button{
            @apply ml-auto w-max px-50px rounded-15px;
          }
        }
      }
    }
  }
</style>
