<template>
  <div class="_v_hidden_form" :class="{ 'show': isShow }">
    <button @click="openMenu">
      {{ cta }}
    </button>
    <form id="form_hidden_home" @submit="submit">
      <v-input :placeholder="item.form.name" id="name" :maxlength="100" />
      <v-input :placeholder="item.form.telphone" id="telphone" :mask="'(##) #####-####'" :maxlength="15" />
      <v-input :placeholder="item.form.email" id="email" type="email" :maxlength="255" />
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
  </div>
</template>

<script>
import sitemap from '@/data/sitemap.json'
export default {
  props: {
    cta: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      sitemap,
      item: {
        form: {
          name: 'Nome',
          telphone: 'WhatsApp',
          email: 'E-mail',
          send: 'Sou investidor'
        }
      },
      isShow: false
    }
  },
  methods: {
    openMenu () {
      this.isShow = !this.isShow
    },
    submit (e) {
      e.preventDefault()
      const form = e.target

      const tags = []
      if (form.accept_receive_email.checked) { tags.push('aceitou envio de emails') }
      if (form.accept_privacy.checked) { tags.push('aceitou politica de privacidade') }

      const data = {
        conversion_identifier: 'formulario_escondido_home_capton',
        name: form.name.value,
        email: form.email.value,
        mobile_phone: form.telphone.value.replace(/[^0-9]/g, ''),
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
  ._v_hidden_form{
    @apply mr-100px relative;
    transition: all 0.3s ease-in-out;
    >button{
      @apply mb-20px w-full border-$secondary border;
      transition: all 0.3s ease-in-out;
    }

    #form_hidden_home{
      @apply flex flex-col gap-20px
             absolute top-60px left-0
             w-full h-0 overflow-hidden
             transform origin-top ;
      transition: height 0.15s linear, opacity 0.3s ease-in-out;

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
        @apply w-max ml-auto font-normal;
      }
    }

    &.show{
      >button{
        @apply bg-transparent text-$secondary;
      }

      #form_hidden_home{
        @apply relative top-0px h-full opacity-100;
      }
    }
  }

  @media screen and (max-width: 768px) {
    ._v_hidden_form{
      @apply mr-0px mt-10px;
    }
  }
</style>
