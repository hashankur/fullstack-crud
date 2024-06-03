<template>
  <div class="grid h-screen max-w-screen-xl px-4 py-16 mx-auto place-items-center sm:px-6 lg:px-8">
    <div class="flex flex-col items-center justify-center w-1/2 grow">
      <div class="max-w-lg mx-auto mb-10 text-center">
        <h1 class="text-2xl font-bold sm:text-3xl">Create Profile</h1>
      </div>

      <FilePicker @update:previewImage="handlePreviewImage" />
      <form
        @submit.prevent="getFormValues"
        action="#"
        class="flex flex-col items-center max-w-md mx-auto mt-8 mb-0 space-y-4"
      >
        <div>
          <label for="email" class="sr-only">Name</label>

          <div class="relative">
            <input
              v-model="name"
              type="text"
              class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
              placeholder="Enter name"
            />
          </div>
        </div>

        <button
          @click="createProfile"
          class="w-full px-5 py-3 text-sm font-medium text-white bg-blue-500 rounded-lg"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import firebase from '../firebase'
import { getAuth, updateProfile } from 'firebase/auth'
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage'
import FilePicker from '../components/FilePicker.vue'

const auth = getAuth(firebase)
const storage = getStorage(firebase)
const router = useRouter()

const name = ref('')
const image = ref('')

const createProfile = async () => {
  // Convert base64 string to Blob
  const response = await fetch(image.value)
  const blob = await response.blob()

  const filename = `${auth.currentUser.uid}.jpg`

  // Create a storage reference
  const imageRef = storageRef(storage, `user_images/${filename}`)

  // Upload the image to Firebase Storage
  const uploadTask = uploadBytesResumable(imageRef, blob)

  // Wait for the upload to complete
  await new Promise((resolve, reject) => {
    uploadTask.on('state_changed', null, reject, resolve)
  })

  // Get the download URL of the uploaded image
  const downloadURL = await getDownloadURL(imageRef)

  // Update the user profile with the download URL
  await updateProfile(auth.currentUser, {
    displayName: name.value,
    photoURL: downloadURL
  })

  router.push('/')
}

// Get image data from FilePicker component
const handlePreviewImage = (previewImage) => {
  image.value = previewImage
}
</script>
