<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">
            <h1>Semua Produk</h1>
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
                  <td><button @click="addToCart(product)" class="add-button btn btn-primary"
                      :hidden="product.stock === 0">Add to cart</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="card-body">
            <h1>Keranjang Belanja</h1>
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
export default {
  data: function () {
    return {
      products: [
        {
          name: "Indomie goreng rendang",
          description: "Masakan instant terenak di dunia",
          stock: 10,
          price: "Rp. 3900",
          qty: 0,
        },
        {
          name: "Mie gelas rendang",
          description: "Mie instant khusus anak kosan",
          stock: 5,
          price: "Rp. 1500",
          qty: 0,
        },
        {
          name: "Bakmi mewah",
          description: "Kalau anak kosan jangan macem-macem deh",
          stock: 80,
          price: "Rp. 10000",
          qty: 0,
        },
      ],
      cartItems: [],
    };
  },
  methods: {
    addToCart(product) {
      const existingCartItem = this.cartItems.find((item) => item.name === product.name);

      if (existingCartItem) {
        existingCartItem.qty++;
      } else {
        const cartProduct = {
          name: product.name,
          qty: 1,
          price: product.price,
        };
        this.cartItems.push(cartProduct);
      }

      if (product.stock > 0) {
        product.qty++;
        product.stock--;

        this.cartItems.push(cartProduct);

        this.$emit("addToCart", cartProduct);
      }
    },
    calculateTotal() {
      return this.cartItems.reduce((total, item) => {
        return total + item.qty * parseFloat(item.price.replace("Rp. ", "").replace(",", ""));
      }, 0);
    },
    checkout() {
      const total = this.calculateTotal();
      alert(`Pay us Rp. ${total}`)
    },
    removeFromCart(index) {
      const itemToRemove = this.cartItems[index];
      if (itemToRemove) {
        itemToRemove.qty--;

        if (itemToRemove.qty === 0) {
          this.cartItems.splice(index, 1);
        }

        const product = this.products.find((p) => p.name === itemToRemove.name);
        if (product) {
          product.stock++;
        }
      }
    },
  },
  mounted() {
    console.log('Component mounted.')
  }
}
</script>