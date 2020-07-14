<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div  class="left green"></div>
          </div>
          <div  class="col">
            <q-banner inline-actions class="text-brown-grey-14">
              <div class="text-h6">Data Makanan</div>
              <div>Data Makanan Rumah Makanan</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
     <q-card class="bg-grey">
        <q-table
          :data="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="makanan" :props="props">
                {{ props.row.makanan }}
              </q-td>
              <q-td key="harga" :props="props">
                Rp. {{ props.row.harga }},-
              </q-td>
              <q-td key="deskripsi" :props="props">
                <div class="ellipsis" style="max-width: 200px;">
                  {{ props.row.deskripsi }}
                </div>
              </q-td>
              <q-td key="image" :props="props">
                 <q-img
                  :src="`${$baseImageURL}/${props.row.image}`"
                  spinner-color="white"
                />
              </q-td>
              <q-td key="aksi" :props="props">
                <div class="row q-gutter-md">
                  <q-btn :to="{ name: 'formEdit', params: { id: props.row._id }}" label="Edit" icon="edit" color="warning" unelevated/>
                  <q-btn @click="deleteImage(props.row._id)" label="Hapus" icon="delete" color="negative" unelevated/>
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'makanan', align: 'left', label: 'Menu Makanan', field: 'makanan', sortable: true },
        { name: 'harga', align: 'left', label: 'Harga', field: 'harga', sortable: true },
        { name: 'deskripsi', align: 'left', label: 'Deskripsi', field: 'deskripsi', sortable: true },
        { name: 'image', align: 'left', label: 'Gambar', field: 'image' },
        { name: 'aksi', align: 'left', label: 'Aksi', field: 'aksi' }
      ],
      data: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('makanan/getallmakanan')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          } else {
            this.showNotif(res.data.pesan, 'negative')
          }
        })
    },
    deleteImage (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Ingin Menghapus Makanan ini ?',
        cancel: true,
        parsistent: true
      }).onOk(() => {
        this.$axios.delete(`makanan/delete/${id}`)
          .then(res => {
            if (res.data.sukses) {
              this.$showNotif(res.data.pesan, 'positive')
              this.getData()
            } else {
              this.$showNotif(res.data.pesan, 'negative')
            }
          })
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
