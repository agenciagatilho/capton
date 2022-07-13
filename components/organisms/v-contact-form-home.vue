<template>
  <v-container class="_transform_my_business">
    <div class="_text">
      <h2>{{ item.title }}</h2>
      <p>{{ item.description }}</p>
    </div>
    <form id="form_contact_home" @submit="submit">
      <v-input :placeholder="item.form.name" id="name" :maxlength="100" />
      <v-input :placeholder="item.form.email" id="email" type="email" :maxlength="255" />
      <v-input :placeholder="item.form.city" id="city" :maxlength="100" />
      <v-input :placeholder="item.form.operating" id="operating" :maxlength="100" />
      <v-input :placeholder="item.form.site" id="site" :maxlength="100" />
      <button type="submit">
        {{ item.form.send }}
      </button>
    </form>
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
  methods: {
    submit (e) {
      e.preventDefault()
      const form = e.target

      const data = {
        conversion_identifier: 'contato_home_capton',
        name: form.name.value,
        email: form.email.value,
        city: form.city.value,
        website: form.site.value,
        cf_operating: form.operating.value
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

      ._text{
        @apply flex flex-col gap-40px;
      }

      #form_contact_home{
        @apply pl-10px flex flex-col gap-20px;

        button{
          @apply ml-auto w-max px-50px rounded-15px;
        }
      }
    }
  }
</style>
