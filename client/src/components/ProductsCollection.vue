<template>
  <section>
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header>
        <h2 class="mt-10 text-xl font-bold text-gray-900 sm:text-3xl">Product Collection</h2>
        <button
          @click="addProduct"
          class="rounded-lg px-4 py-2 mt-5 text-sm font-medium text-gray-500 [text-align:_inherit] bg-gray-100 hover:text-gray-700"
        >
          Add product
        </button>
      </header>

      <ul class="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="product in products" :key="product.id">
          <div @click="editProduct({ ...product })" class="block overflow-hidden group">
            <img
              :src="product.image"
              alt=""
              class="h-[350px] w-full object-contain transition duration-500 group-hover:scale-105 sm:h-[450px]"
            />

            <div class="relative pt-3 bg-white">
              <h3
                class="text-xs text-gray-700 group-hover:underline group-hover:underline-offset-4"
              >
                {{ product.title }}
              </h3>

              <p class="mt-2">
                <span class="sr-only"> Regular Price </span>

                <span class="tracking-wider text-gray-900"> $ {{ product.price }} </span>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
  <ProductManager
    @update:selected="selected = $event"
    @remove:selected="products = products.filter((product) => product.id !== selectedProduct.id)"
    @add:selected="($event) => $event.id && products.push($event)"
    @edit:selected="
      ($event) =>
        (products = products.map((product) => (product.id === $event.id ? $event : product)))
    "
    :selected
    :selectedProduct
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ProductManager from './ProductManager.vue'

type Product = {
  id: number
  title: string
  price: number
  image: string
}

const selected = ref(false)
let selectedProduct = {
  id: 0,
  title: '',
  price: 0,
  image: ''
}
const products = ref<Array<Product>>([])

fetch(`${import.meta.env.VITE_BACKEND_URL}/products`)
  .then((response) => response.json())
  .then((data) => (products.value = data.result))

const addProduct = () => {
  selected.value = !selected.value
  selectedProduct = {
    id: 0,
    title: '',
    price: 0,
    image: ''
  }
}

const editProduct = (product: Product) => {
  selected.value = !selected.value
  selectedProduct = product
}
</script>
