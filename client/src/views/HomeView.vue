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
    alert('You must be logged in to view this. redirecting to the sign-in page')
    router.push('/sign-in')
  }
})
onBeforeUnmount(() => {
  // clear up listener
  authListener()
})
</script>
