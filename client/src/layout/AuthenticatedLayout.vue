<script setup>
import { RouterView } from 'vue-router'
import Navbar from '../components/SideBar.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-6 lg:gap-8">
    <Navbar />
    <div class="col-span-5">
      <RouterView />
    </div>
  </div>
</template>
