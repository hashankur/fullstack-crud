<template>
  <button
    @click="toggle = !toggle"
    class="fixed top-0 z-50 text-gray-800 translate-x-8 translate-y-8"
  >
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="w-6 h-6"
      :class="{ hidden: !toggle }"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12"
      ></path>
    </svg>
    <svg
      data-slot="icon"
      fill="none"
      stroke-width="1.5"
      stroke="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      class="w-6 h-6"
      :class="{ hidden: toggle }"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"></path>
    </svg>
  </button>
  <div
    class="sticky top-0 flex flex-col justify-between h-screen bg-white border-e"
    :class="{ hidden: toggle }"
  >
    <div class="px-4 py-6">
      <span
        class="grid w-32 h-10 text-xs text-gray-600 bg-gray-100 rounded-lg place-content-center"
      >
        Store
      </span>

      <ul class="mt-6 space-y-1">
        <li>
          <RouterLink to="/" class="block px-4 py-2 text-sm font-medium text-gray-700 rounded-lg">
            Home
          </RouterLink>
        </li>

        <li>
          <details class="group [&_summary::-webkit-details-marker]:hidden">
            <summary
              class="flex items-center justify-between px-4 py-2 text-gray-500 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-700"
            >
              <span class="text-sm font-medium"> Account </span>

              <span class="transition duration-300 shrink-0 group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-5 h-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </summary>

            <ul class="px-4 mt-2 space-y-1">
              <li>
                <RouterLink
                  to="/user-profile"
                  class="block px-4 py-2 text-sm font-medium text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700"
                >
                  Edit Profile
                </RouterLink>
              </li>

              <li>
                <button
                  @click="signOutUser"
                  class="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                >
                  Logout
                </button>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>

    <div class="sticky inset-x-0 bottom-0 border-t border-gray-100">
      <a href="#" class="flex items-center gap-2 p-4 bg-white hover:bg-gray-50">
        <img
          alt=""
          :src="userData.photoURL ? userData.photoURL : userDefaultImg"
          class="object-cover rounded-full size-10"
        />

        <div>
          <p class="text-xs">
            <strong class="block font-medium">{{ userData.displayName }}</strong>

            <span> {{ userData.email }} </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue' // used for conditional rendering
import { useRouter } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'
import userDefaultImg from '../assets/user.png'

const router = useRouter()
const isLoggedIn = ref(true)
let userData = ref('')
const toggle = ref(false)

// runs after firebase is initialized
onAuthStateChanged(auth, (user) => {
  userData.value = auth.currentUser.providerData[0]
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
