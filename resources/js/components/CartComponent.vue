<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card mt-5">
          <div class="card-header">
            <h1>Halaman Keranjang</h1>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in cartItems" :key="index">
                  <td>{{ item.name }}</td>
                  <td>{{ item.qty }}</td>
                  <td>{{ item.price }}</td>
                  <td><button @click="removeFromCart(index)" class="delete-button btn btn-danger">Delete</button></td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <th>Total:</th>
                  <th></th>
                  <th>Rp. {{ calculateTotal() }}</th>
                </tr>
              </tfoot>
            </table>
            <button @click="checkout" class="btn btn-success">Checkout</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data: function () {
    return {
      cartItems: [],
    };
  },
  computed: {
    ...mapGetters(['getCart']),
    cartItems() {
      return this.getCart;
    },
  },
  methods: {
    ...mapActions(['removeFromCart']),
    calculateTotal() {
      return this.getCart.reduce((total, item) => {
        return total + item.qty * parseFloat(item.price.replace("Rp. ", "").replace(",", ""));
      }, 0);
    },
    checkout() {
      const total = this.calculateTotal();
      alert(`Pay us Rp. ${total}`)
    },
  },
  mounted() {
    console.log('Cart Component mounted.')
  }
}
</script>