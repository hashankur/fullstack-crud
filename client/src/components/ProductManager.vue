<template>
  <div
    class="relative z-10"
    :class="{ hidden: !props.selected }"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div class="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75"></div>

    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div class="flex items-end justify-center min-h-full p-4 text-center sm:items-center sm:p-0">
        <div
          class="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg"
        >
          <div class="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
            <div class="grid items-center justify-center gap-10 mt-8 md:grid-cols-2">
              <FilePicker
                @update:previewImage="handlePreviewImage"
                :image="selectedProduct.image"
              />
              <form
                @submit.prevent="getFormValues"
                class="flex flex-col items-center max-w-md mx-auto mt-8 mb-0 space-y-4"
              >
                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">Name</label>

                  <div class="relative">
                    <input
                      v-model="selectedProduct.title"
                      type="text"
                      class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                      placeholder="Enter product name"
                    />
                  </div>
                </div>

                <div>
                  <label class="block mb-2 text-sm font-medium text-gray-700">Price</label>

                  <div class="relative">
                    <input
                      v-model="selectedProduct.price"
                      type="number"
                      class="w-full p-4 text-sm border-gray-200 rounded-lg shadow-sm pe-12"
                      placeholder="Enter product price"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="px-4 py-3 bg-gray-50 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              @click="manageProduct"
              type="button"
              class="inline-flex justify-center w-full px-3 py-2 text-sm font-semibold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-400 sm:ml-3 sm:w-auto"
            >
              Add
            </button>
            <button
              @click="$emit('update:selected', false)"
              type="button"
              class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
            <span class="grow"></span>
            <button
              @click="deleteProduct"
              type="button"
              class="inline-flex justify-center w-full px-3 py-2 mt-3 text-sm font-semibold text-white bg-red-600 rounded-md shadow-sm hover:bg-red-500 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import FilePicker from '../components/FilePicker.vue'

const props = defineProps({
  selected: Boolean,
  selectedProduct: Object
})

const router = useRouter()
const image = ref('')

const manageProduct = () => {
  console.log(props.selectedProduct)
  fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${props.selectedProduct.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: props.selectedProduct.title,
      price: props.selectedProduct.price,
      image: props.selectedProduct.image
    })
  })
}

const deleteProduct = () => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${props.selectedProduct.id}`, {
    method: 'DELETE'
  })
  router.go()
}

// Get image data from FilePicker component
const handlePreviewImage = (previewImage) => {
  image.value = previewImage
}
</script>
