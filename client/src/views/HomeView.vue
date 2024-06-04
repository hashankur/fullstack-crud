<template>
  <ProductsCollection />
</template>

<script setup>
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import ProductsCollection from '../components/ProductsCollection.vue'

const router = useRouter()

const authListener = onAuthStateChanged(auth, (user) => {
  if (!user) {
    // not logged in
    router.push('/sign-in')
  }
})
onBeforeUnmount(() => {
  // clear up listener
  authListener()
})
</script>
