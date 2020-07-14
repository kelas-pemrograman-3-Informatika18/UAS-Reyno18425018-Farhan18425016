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
                      <div class="text-h5 text-bold">Rumah Makan RF</div>
                      <div>Login Akun Anda</div>
                    </q-card-section>
                    <q-form
                      @submit="login"
                   >
                    <q-card-section>
                      <q-input v-model="username" label="Username"/>
                      <q-input type="password" v-model="password" label="Password"/>
                    </q-card-section>
                    <q-card-section>
                      <q-btn class="full-width" type="submit" unelevated color="brown" label="Login" />
                      <q-btn class="full-width q-mt-md" :to="{ name: 'registerpage' }" flat unelevated color="brown" label="Register" />
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
      password: null
    }
  },
  methods: {
    login () {
      this.$axios.post('user/login', {
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.data.sukses) {
          this.$q.localStorage.set('datauser', res.data.data)
          if (res.data.data.level === 1) {
            this.$router.push({ name: 'dashboardAdmin' })
          } else {
            this.$router.push({ name: 'menuMakanan' })
          }
        } else {
          this.$showNotif(res.data.pesan, 'negative')
        }
      })
    }
  }
}
</script>
