<template>
  <q-page padding>
    <div class="q-mb-xl">
      <q-carousel
      animated
      v-model="slide"
      navigation
      infinite
      :autoplay="autoplay"
      arrows
      transition-prev="slide-right"
      transition-next="slide-left"
      @mouseenter="autoplay = false"
      @mouseleave="autoplay = true"
    >
      <q-carousel-slide :name="1" img-src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Nasi_ramas_rendang.JPG" />
      <q-carousel-slide :name="2" img-src="https://myeatandtravelstory.files.wordpress.com/2019/01/cover-padang-merdeka-1500x1001.jpg" />
      <q-carousel-slide :name="3" img-src="https://akcdn.detik.net.id/visual/2019/04/23/5e88d2ae-6110-4ebd-a66b-62ffb99d8ecc_169.jpeg?w=650" />
      <q-carousel-slide :name="4" img-src="https://ecs7.tokopedia.net/img/cache/200-square/product-1/2019/10/1/6862852/6862852_a88a3710-ff72-4f4c-9217-643e15eda867_554_554.jpg.webp" />
    </q-carousel>
    </div>
    <div class="row q-col-gutter-md">
      <div class="col-md-3 col-xs-12" v-for="(makanan, i) in data" :key="i">
        <q-card>
          <q-img
              :src="`${$baseImageURL}/${makanan.image}`"
              :ratio="16/9"
              />
          <q-card-section>
            <q-btn
              fab
              color="brown"
              icon="add_shopping_cart"
              class="absolute"
              unelevated
              style="top: 0; right: 12px; transform: translateY(-50%);"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">
                {{ makanan.makanan }}
              </div>
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">
             Rp. {{ makanan.harga }}
            </div>
            <div @click="makanan.expanded = !makanan.expanded" class="text-caption text-brown cursor-pointer">
              Tampilkan Deskripsi
            </div>
            <q-slide-transition>
              <div v-show="makanan.expanded">
                <div class="text-brown text-caption">
                  {{ makanan.deskripsi }}
                </div>
              </div>
            </q-slide-transition>
          </q-card-section>

          <q-card-actions>
            <q-btn unelevated @click="openDetail(makanan)" class="full-width" color="brown">
              Order Now
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="dialog" v-if="dialog" position="bottom">
      <q-card style="width: 500px">
        <q-card-section>
          <div class="text-h6">Detail Pemesanan</div>
        </q-card-section>
        <q-card-section style="max-height: 50vh;" class="scroll">
          {{ activeData.makanan }} - Rp.{{ activeData.harga }},-
          <q-form class="q-mt-md">
            <q-input filled type="number" class="q-mb-md" v-model="jumlah" label="Masukan Jumlah"/>
             Rp. {{ total  }},-
            <q-input filled type="string" class="q-mb-md" v-model="alamat" label="Masukan Alamat Pengiriman"/>
            <q-file color="teal" class="q-mt-md" filled v-model="image" label="Label">
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
          </q-form>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Batal" v-close-popup />
          <q-btn color="brown" @click="prosesTransaksi()" label="Proses" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      stars: 4,
      dialog: false,
      image: null,
      data: [],
      activeData: null,
      jumlah: 1,
      alamat: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('makanan/getallmakanan')
        .then(res => {
          if (res.data.sukses) {
            this.data = res.data.data.map(makanan => {
              return Object.assign(makanan, {
                expanded: false
              })
            })
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.dialog = true
    },
    prosesTransaksi () {
      const formData = new FormData()
      formData.append('image', this.image)
      formData.append('data', JSON.stringify({
        idUser: this.$q.localStorage.getItem('datauser')._id,
        idMakanan: this.activeData._id,
        harga: this.activeData.harga,
        jumlah: this.jumlah,
        total: this.total,
        alamat: this.alamat
      }))
      this.$axios.post('order/insert', formData)
        .then(res => {
          if (res.data.sukses) {
            this.$showNotif(res.data.pesan, 'positive')
            this.dialog = false
            this.image = null
          } else {
            this.$showNotif(res.data.pesan, 'negative')
          }
        })
    }
  },
  computed: {
    total () {
      return this.activeData.harga * this.jumlah
    }
  }
}
</script>
