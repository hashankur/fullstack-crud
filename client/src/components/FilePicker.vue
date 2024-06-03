<template>
  <!-- Wrapped in label to create group clickable area -->
  <label>
    <div class="">
      <img
        :src="previewImage ? previewImage : userDefaultImg"
        alt="Placeholder"
        class="object-cover rounded-2xl size-40"
      />
    </div>
    <input type="file" @change="handleFileChange" accept="image/*" class="hidden" />
  </label>
</template>

<script setup>
import userDefaultImg from '../assets/user.png'
import { ref } from 'vue'
const previewImage = ref('')

const emit = defineEmits(['update:previewImage'])

const handleFileChange = (event) => {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    previewImage.value = e.target.result
    emit('update:previewImage', previewImage.value)
  }
  reader.readAsDataURL(file)
}
</script>
