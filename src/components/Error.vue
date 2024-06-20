<template>
    <ul v-if="props.errors">
        <li v-for="(error, index) in Object.keys(props.errors)" :key="index" className="error">
            {{ props.errors[error][0] }}
        </li>
    </ul>
</template>

<script setup>
const props = defineProps(['errors'])
</script>

<style scoped>
.error {
    color: red;
}
</style>
