<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-brown text-white">
      <q-toolbar>
        <q-btn dense flat round @click="leftDrawerOpen = !leftDrawerOpen" size="25px" icon="menu"/>
        <q-space></q-space>
        <div class="text-h6 text-bold text-center"> ADMIN RUMAH MAKAN REYNO FARHAN</div>
        <q-space></q-space>
        <q-btn flat round>
          <q-avatar size="45px">
          <q-img src="https://cdn.quasar.dev/img/avatar.png"/>
          </q-avatar>
          <q-menu>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="logout()">
              <q-item-section>Logout</q-item-section>
            </q-item>
          </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      content-class="text-brown bg-white"
    >
      <q-scroll>
        <q-scroll-area class="fit">
          <q-list>
            <q-item class="justify-center text-center q-mt-md q-mb-md">
              <div>
                <q-avatar size="120px">
                  <q-img src="https://cdn.quasar.dev/img/avatar.png"/>
                </q-avatar>
                <div class="text-weight-bold q-mt-md">{{ $q.localStorage.getItem('datauser').namaLengkap }}</div>
                <div>Aplikasi Penjualan Film</div>
              </div>
            </q-item>

            <q-item clickable active-class="active" v-ripple exact :to="{ name: 'dashboardAdmin' }">
              <q-item-section avatar>
                <q-icon name="dashboard"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Dashboard</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datamakanan' }">
              <q-item-section avatar>
                <q-icon name="menu_book"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Data Makanan</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable active-class="active" v-ripple exact :to="{ name: 'inputmakanan' }">
              <q-item-section avatar>
                <q-icon name="input"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Input makanan</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable active-class="active" v-ripple exact :to="{ name: 'datauser'}">
              <q-item-section avatar>
                <q-icon name="supervisor_account"/>
              </q-item-section>
              <q-item-section>
                <q-item-label>Data User</q-item-label>
              </q-item-section>
            </q-item>

          </q-list>
        </q-scroll-area>
      </q-scroll>
    </q-drawer>

    <q-page-container class="bg-brown">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',

  components: {
  },

  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {

    logout () {
      this.$q.localStorage.remove()
      this.$router.push({ name: 'loginpage' })
    }
  }
}
</script>
<style scoped>
.active{
  color: whitesmoke;
  background: rgb(143, 83, 65);
  padding-right: 10px;
}
</style>
