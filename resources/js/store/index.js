import { createStore } from "vuex";

export default createStore({
    state: {
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
    },
    getters: {
        getProducts: (state) => state.products,
        getCart: (state) => state.cartItems,
        calculateTotal: (state) => {
            return state.cartItems.reduce((total, item) => {
                return (
                    total +
                    item.qty *
                        parseFloat(
                            item.price.replace("Rp. ", "").replace(",", "")
                        )
                );
            }, 0);
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit("addToCart", product);
        },
        removeFromCart({ commit }, index) {
            commit("removeFromCart", index);
        },
    },
    mutations: {
        addToCart(state, product) {
            const existingCartItem = state.cartItems.find(
                (item) => item.name === product.name
            );

            if (existingCartItem) {
                existingCartItem.qty++;
            } else {
                const cartProduct = {
                    name: product.name,
                    qty: 1,
                    price: product.price,
                };
                state.cartItems.push(cartProduct);
            }

            if (product.stock > 0) {
                product.qty--;
                product.stock--;
            }
        },
        removeFromCart(state, index) {
            const itemToRemove = state.cartItems[index];
            if (itemToRemove) {
                itemToRemove.qty--;

                if (itemToRemove.qty === 0) {
                    state.cartItems.splice(index, 1);
                }

                const product = state.products.find(
                    (p) => p.name === itemToRemove.name
                );
                if (product) {
                    product.stock++;
                }
            }
        },
    },
});
