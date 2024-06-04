<script setup>
import { RouterView } from 'vue-router'
import SideBar from '../components/SideBar.vue'
</script>

<template>
  <div class="grid grid-cols-1 gap-4 md:grid-cols-6 lg:gap-8">
    <SideBar />
    <div class="col-span-5">
      <RouterView />
    </div>
  </div>
</template>
