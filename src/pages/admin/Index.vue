<template>
  <q-page padding>
    <div class="row q-mb-md col-gutter-md">
      <div class="col-md-12 col-xs-12 col-lg-12">
        <div class="row">
          <div class="col-auto">
            <div  class="left white"></div>
          </div>
          <div  class="col">
            <q-banner inline-actions class="text-dark-white-14">
              <div class="text-h6">Data Transaksi</div>
              <div>Data Transaksi Pembelian</div>
            </q-banner>
          </div>
        </div>
      </div>
    </div>
     <q-card class="bg-brown">
        <q-table
          :data="data"
          flat
          :columns="columns"
          row-key="name"
        >
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="makanan" :props="props">
                {{ props.row.datamakanan[0].makanan }}
              </q-td>
              <q-td key="harga" :props="props">
                {{ props.row.harga }}
              </q-td>
              <q-td key="jumlah" :props="props">
                {{ props.row.jumlah }}
              </q-td>
              <q-td key="total" :props="props">
                {{ props.row.total }}
              </q-td>
              <q-td key="alamat" :props="props">
                {{ props.row.alamat }}
              </q-td>
              <q-td key="nama" :props="props">
                {{ props.row.datauser[0].namaLengkap }}
              </q-td>
              <q-td key="status" :props="props">
                <q-badge v-if="props.row.status === 1" color="red" class="q-pa-sm">
                  Belum di konfirmasi
                </q-badge>
                <q-badge v-else-if="props.row.status === 2" color="blue" class="q-pa-sm">
                  Sedang Dalam Pengiriman
                </q-badge>
                <q-badge v-else color="green" class="q-pa-sm">
                  Sudah Diterima Pembeli
                </q-badge>
              </q-td>
              <q-td key="aksi" :props="props">
                <q-btn label="Detail" @click="openDetail(props.row)" color="positive" unelevated/>
                <q-btn :disabled="props.row.status !== 1" label="Konfirmasi" @click="confirm(props.row._id)" class="q-ml-sm" color="orange" unelevated/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
    </q-card>
    <q-dialog
      v-model="detail"
      v-if="detail"
    >
      <q-card style="width: 700px; max-width: 80vw;">
        <q-card-section>
          <div class="text-h6">Detail Order</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row">
            <div class="col">
              <div class="text-captios">
                Nama Pembeli
              </div>
              <div class="text-weight-bold">
                {{ activeData.datauser[0].namaLengkap }}
              </div>
            </div>
            <div class="col">
              <div class="text-captios">
                Menu Makanan
              </div>
              <div class="text-weight-bold">
                {{ activeData.datamakanan[0].makanan }}
              </div>
            </div>
            <div class="col">
              <div class="text-captios">
                Harga
              </div>
              <div class="text-weight-bold">
                {{ activeData.harga }}
              </div>
            </div>
            <div class="col">
              <div class="text-captios">
                Jumlah
              </div>
              <div class="text-weight-bold">
                {{ activeData.jumlah }}
              </div>
            </div>
            <div class="col">
              <div class="text-captios">
                Total
              </div>
              <div class="text-weight-bold">
                {{ activeData.total }}
              </div>
            </div>
          </div>
          <div class="col">
              <div class="text-captios">
                Alamat
              </div>
              <div class="text-weight-bold">
                {{ activeData.alamat }}
              </div>
            </div>
          <div class="r">
            <q-img :src="`${$baseImageURL}/${activeData.image}`"></q-img>
          </div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      columns: [
        { name: 'makanan', align: 'center', label: 'Menu Makanan', field: 'makanan', sortable: true },
        { name: 'harga', align: 'center', label: 'Harga', field: 'harga', sortable: true },
        { name: 'jumlah', align: 'center', label: 'Jumlah Beli', field: 'jumlah', sortable: true },
        { name: 'total', align: 'center', label: 'Total', field: 'total', sortable: true },
        { name: 'alamat', align: 'center', label: 'Alamat', field: 'alamat', sortable: true },
        { name: 'nama', align: 'center', label: 'Nama Pembeli', field: 'nama', sortable: true },
        { name: 'status', align: 'center', label: 'Status', field: 'status', sortable: true },
        { name: 'aksi', align: 'center', label: 'Aksi', field: 'aksi' }
      ],
      data: [],
      detail: false,
      activeData: null
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      this.$axios.get('order/getallorder')
        .then((res) => {
          if (res.data.sukses) {
            this.data = res.data.data
          }
        })
    },
    openDetail (data) {
      this.activeData = data
      this.detail = true
    },
    confirm (id) {
      this.$q.dialog({
        title: 'Konfirmasi',
        message: 'Apakah Anda Yakin Mengkonfirmasi Pesanan Ini ?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.$axios.put(`order/konfirmasiorder/${id}`)
          .then((res) => {
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
