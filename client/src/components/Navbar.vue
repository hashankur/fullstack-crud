<template>
  <nav>
    <RouterLink to="/" class="">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <span v-if="isLoggedIn">
      <button @click="signOutUser">Logout</button>
    </span>
    <span v-else>
      <router-link to="/register"> Register </router-link> |
      <router-link to="/sign-in"> Login </router-link>
    </span>
  </nav>
</template>

<script setup>
import firebase from '../firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { ref } from 'vue' // used for conditional rendering
import { useRouter } from 'vue-router'

const router = useRouter(firebase)
const auth = getAuth(firebase)
const isLoggedIn = ref(true)

// runs after firebase is initialized
onAuthStateChanged(auth, (user) => {
  if (user) {
    isLoggedIn.value = true // if we have a user
  } else {
    isLoggedIn.value = false // if we do not
  }
})
const signOutUser = () => {
  auth.signOut()
  router.push('/')
}
</script>
