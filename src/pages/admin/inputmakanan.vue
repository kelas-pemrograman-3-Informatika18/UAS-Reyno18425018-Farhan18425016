<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div  class="left brown"></div>
          </div>
          <div  class="col">
            <q-banner inline-actions class="text-brown-grey-14">
              <div class="text-h6">Input Menu</div>
              <div>Input Data Menu Makanan</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
     <q-card flat>
      <q-card-section class="row">
          <q-form
            @submit="onSubmit()"
            class="q-col-gutter-md q-col-lg-6 col-md-6 col-xs-12"
          >
            <q-input
              filled
              v-model="form.makanan"
              label="Menu Makanan"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Mohon isi Menu Makanan']"
            />
            <q-input
              filled
              v-model="form.harga"
              type="number"
              label="Harga"
              lazy-rules
              :rules="[ val => val > 0 || 'Mohon isi Harga']"
            />

            <q-input
              v-model="form.deskripsi"
              filled
              type="textarea"
              label="Deskripsi"
            />
            <q-file accept=".jpg, image/*" color="teal" filled v-model="image" label="Upload Gambar">
            <template v-slot:prepend>
              <q-icon name="cloud_upload" />
            </template>
            </q-file>
            <div>
              <q-btn label="Submit" type="submit" color="brown"/>
              <q-btn label="Reset" type="reset" color="brown" flat class="q-ml-sm" />
            </div>
          </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      form: {
        menu: null,
        harga: 0,
        deskripsi: null
      },
      image: null
    }
  },
  methods: {
    onSubmit () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify(this.form))
      this.$axios.post('makanan/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.$router.push({ name: 'datamakanan' })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  }
}
</script>
<style scoped>
.left {
  width: 8px;
  height: 100%;
  background-color: rgb(155, 70, 44);
}
</style>
