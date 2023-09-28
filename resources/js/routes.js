import Products from "./components/ProductsComponent.vue";
import Cart from "./components/CartComponent.vue"; 
import NotFound from "./components/NotFoundComponent.vue"

export const routes = [
    {
        path: "/products",
        name: "products",
        component: Products
    },
    {
        path: "/cart",
        name: "cart",
        component: Cart
    },
    {
    path: "/:pathMatch(.*)*",
    name: "NotFound",   
    component: NotFound
    }
]
