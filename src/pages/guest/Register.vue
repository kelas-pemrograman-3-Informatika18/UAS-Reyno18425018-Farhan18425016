<template>
  <q-layout>
    <q-page-container >
      <q-img src="https://bisnisukm.com/uploads/2016/07/rumah-makan-padang-untungnya-semakin-nendang.jpg">
      <q-page padding class="row items-center justify-center">
        <div class="row full-width">
          <div class="col-md-8 offset-md-2 col-xs-12 q-pa-md">
            <q-card flat class="text-brown-grey-14">
              <div class="row items-center">
                <div class="col-md-6 col-sm-12-col-xs-12">
                  <div class="row q-pt-md q-pb-md">
                    <div class="col-md-8 offset-2">
                      <q-img src="https://cdn2.boombastis.com/wp-content/uploads/2017/07/fi-rumah-makan-padang.jpg"></q-img>
                      <div class="text-h6 text-bold text-center"> RUMAH MAKAN REYNO FARHAN</div>
                      <div class="text-h6 text-bold text-center">SINCE 2020</div>
                    </div>
                  </div>
                </div>
              <div class="col-md-6">
              <q-card-section>
              <div class="text-h5 text-bold">
                Halaman Register
              </div>
              </q-card-section>
              <q-form
                @submit="onSubmit"
              >
                <q-card-section>
                <q-input
                  v-model="username"
                  label="Username"
                  :rules="[
                    val => val && val.length > 0 || 'Ketikan Username'
                  ]"
                  />
                </q-card-section>

                <q-card-section>
                <q-input
                  v-model="namaLengkap"
                  label="Nama Lengkap"
                  :rules="[
                    val => val && val.length > 0 || 'Ketikan Nama Lengkap Anda'
                  ]"
                  />
                </q-card-section>

                <q-card-section>
                <q-input
                  v-model="email"
                  label="Email"
                  :rules="[
                    val => val && val.length > 0 || 'Ketikan Email Anda'
                  ]"
                  />
                </q-card-section>

                <q-card-section>
                <q-input
                 v-model="password"
                 label="Password"
                 type="password"
                 :rules="[
                    val => val && val.length > 0 || 'Ketikan Password Anda'
                  ]"
                 />
                </q-card-section>

                <q-card-section>
                 <div class="q-gutter-md">
                   <q-btn label="Register" type="submit" unelevated color="brown" />
                   <q-btn label="Login" :to="{ name: 'loginpage' }" unelevated color="" flat />
                 </div>
                </q-card-section>
              </q-form>
              </div>
              </div>
            </q-card>
          </div>
        </div>
      </q-page>
      </q-img>
    </q-page-container>
 </q-layout>
</template>
<script>
export default {
  data () {
    return {
      username: null,
      namaLengkap: null,
      email: null,
      password: null
    }
  },
  methods: {
    onSubmit () {
      this.$axios.post('user/register', {
        username: this.username,
        namaLengkap: this.namaLengkap,
        email: this.email,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$showNotif(res.data.pesan, 'positive')
          this.$router.push({ name: 'loginpage' })
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
