<template>
  <RouterProgressBar />
  <router-view />
  <Toast position="top-right" />
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import EventBus from '@/libs/AppEventBus'
import RouterProgressBar from '@/components/RouterProgressBar.vue'

const toast = useToast()

onMounted(() => {
  EventBus.on('show-toast', showToast)
})

onBeforeUnmount(() => {
  EventBus.off('show-toast', showToast)
})

const showToast = (event) => {
  toast.add({
    severity: event.severity,
    summary: event.summary,
    detail: event.detail,
    life: event.life ?? 3000
  })
}
</script>

<style lang="scss" scoped></style>
