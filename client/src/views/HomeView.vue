<template>
  <ProductsCollection />
</template>

<script setup>
import firebase from '../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { onBeforeUnmount } from 'vue'
import ProductsCollection from '../components/ProductsCollection.vue'

const router = useRouter()
const auth = getAuth(firebase)

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
