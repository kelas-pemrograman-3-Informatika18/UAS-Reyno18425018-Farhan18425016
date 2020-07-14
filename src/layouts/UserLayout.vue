<template>
  <q-layout view="lHh LpR fFf">
    <q-toolbar unelevated style="height: 70px" class="bg-brown text-white">
      <div class="text-h6 q-ml-md">Rumah Makan RF</div>
      <q-space />
      <div v-if="$q.screen.md || $q.screen.md || $q.screen.lg || $q.screen.xl">
      <q-btn flat size="medium" :to="{ name:'menuMakanan' }">Menu Makanan</q-btn>
      <q-btn flat size="medium" :to="{ name:'MyOrder' }">PesananKu</q-btn>
      <q-btn flat size="medium" :to="{ name: 'about'}">Tentang</q-btn>
      <q-btn flat @click="logout()" size="medium">logout</q-btn>
      </div>
      <q-btn flat round size="medium" icon="shopping_cart"/>
      <q-btn flat @click="drawer = !drawer" round v-if="$q.screen.xs || $q.screen.sm" icon="menu"/>
    </q-toolbar>
    <q-drawer
        v-model="drawer"
        :width="200"
        :breakpoint="500"
        side="right"
      >
        <q-scroll-area class="fit">
          <q-list padding class="menu-list">

            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="home" />
              </q-item-section>
              <q-item-section>
               Home
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>
    <q-page-container class="bg-grey-2">
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script>
export default {
  data () {
    return {
      drawer: null
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
