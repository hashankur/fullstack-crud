<template>
  <section class="bg-white">
    <div class="lg:grid lg:min-h-screen lg:grid-cols-12">
      <section
        class="relative flex items-end h-32 bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6"
      >
        <img
          alt=""
          src="https://images.unsplash.com/photo-1595991209266-5ff5a3a2f008?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          class="absolute inset-0 object-cover w-full h-full opacity-80"
        />
      </section>

      <main
        class="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
      >
        <div class="max-w-xl lg:max-w-3xl">
          <form @submit.prevent="getFormValues" class="grid grid-cols-6 gap-6 mt-8">
            <div class="col-span-6">
              <label for="Email" class="block text-sm font-medium text-gray-700"> Email </label>

              <input
                v-model="email"
                type="email"
                id="Email"
                name="email"
                class="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
              />
            </div>

            <div class="col-span-6">
              <label for="Password" class="block text-sm font-medium text-gray-700">
                Password
              </label>

              <input
                v-model="password"
                type="password"
                id="Password"
                name="password"
                class="w-full mt-1 text-sm text-gray-700 bg-white border-gray-200 rounded-md shadow-sm"
              />
            </div>

            <div class="col-span-6 sm:flex sm:items-center sm:gap-4">
              <button
                @click="register"
                class="inline-block px-12 py-3 text-sm font-medium text-white transition bg-blue-600 border border-blue-600 rounded-md shrink-0 hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
              >
                Sign in
              </button>

              <p class="mt-4 text-sm text-gray-500 sm:mt-0">
                Don't have an account?
                <router-link to="/sign-up" class="text-gray-700 underline">Sign up.</router-link>
              </p>
            </div>

            <div class="col-span-6">
              <p v-if="errMsg" class="text-red-700">{{ errMsg }}</p>
            </div>
          </form>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup type="ts">
import { ref } from 'vue'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebase from '../firebase'
import { useRouter } from 'vue-router' // import router

const email = ref('')
const password = ref('')
const errMsg = ref() // ERROR MESSAGE
const router = useRouter() // get a reference to our vue router
const auth = getAuth(firebase);

const register = () => {
    signInWithEmailAndPassword(auth,email.value, password.value) // need .value because ref()
    .then((data) => {
      console.log('Successfully registered!')
      router.push('/') // redirect to home page
    })
    .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
              errMsg.value = 'Invalid email'
              break
          case 'auth/user-not-found':
              errMsg.value = 'No account with that email was found'
              break
          case 'auth/wrong-password':
              errMsg.value = 'Incorrect password'
              break
          default:
              errMsg.value = 'Email or password was incorrect'
              break
        }
    })
}
</script>
