<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card mt-5">
          <div class="card-header">
            <h1>Halaman Produk</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Stock</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(product, index) in products" :key="index">
                  <td>{{ product.name }}</td>
                  <td>{{ product.description }}</td>
                  <td>{{ product.stock }}</td>
                  <td>{{ product.price }}</td>
                  <td><button @click="addToCart(product)" style="width: 7rem;" class="add-button btn btn-primary"
                      :hidden="product.stock === 0">Add to cart</button></td>
                </tr>
              </tbody>
              <router-link to="/cart" class="btn border border-3 border-success mt-2">CART</router-link>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data: function () {
    return {
      // products: [
      //   {
      //     name: "Indomie goreng rendang",
      //     description: "Masakan instant terenak di dunia",
      //     stock: 10,
      //     price: "Rp. 3900",
      //     qty: 0,
      //   },
      //   {
      //     name: "Mie gelas rendang",
      //     description: "Mie instant khusus anak kosan",
      //     stock: 5,
      //     price: "Rp. 1500",
      //     qty: 0,
      //   },
      //   {
      //     name: "Bakmi mewah",
      //     description: "Kalau anak kosan jangan macem-macem deh",
      //     stock: 80,
      //     price: "Rp. 10000",
      //     qty: 0,
      //   },
      // ],
      // cartItems: [],
    };
  },
  computed: {
    ...mapGetters({
      products: 'getProducts'
    })
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    cart() {
      this.$router.push('/cart')
    }
  },
  mounted() {
    console.log('Product Component mounted.')
  }
}
</script>