<template>
  <div class="flex surface-section min-h-screen min-w-screen">
    <div class="w-12 sm:w-6 px-4 py-8 md:px-6 lg:px-8">
      <div class="border-left-2 border-red-400">
        <span class="bg-white text-red-400 font-bold text-2xl inline-block px-3">404</span>
      </div>
      <div class="mt-6 mb-5 font-bold text-6xl text-900">Page Not Found</div>
      <p class="text-700 text-3xl mt-0 mb-6">The page you are looking for does not exist.</p>
      <div>
        <Button class="p-button-text mr-2" label="Go Back" icon="pi pi-arrow-left" @click="$router.go(-1)" />
        <router-link :to="{ name: 'dashboard' }">
          <Button label="Go to Dashboard" icon="pi pi-objects-column" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
</script>
