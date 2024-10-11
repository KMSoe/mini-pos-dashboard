<template>
    <div class="card mt-2 bg-white p-5">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="fadeinout animation-duration-500">
            <div class="w-full mx-auto">
                <div class="p-field mb-4">
                    <label for="name" :class="{ 'p-error': v$.name.$invalid && submitted }"
                        >Name</label
                    >
                    <InputText
                        v-model="v$.name.$model"
                        id="name"
                        type="text"
                        class="w-full"
                        placeholder="Name"
                        :class="{ 'p-invalid': v$.name.$invalid && submitted }"
                    />

                    <span v-if="errors?.data?.name" class="p-error">
                        <small v-for="(error, index) in errors.data.name" :key="index">{{
                            errors.data.name[index]
                        }}</small>
                    </span>

                    <span
                        v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
                        class="p-error"
                    >
                        <small>{{
                            v$.name.required.$message.replace('Value', 'Customer Name')
                        }}</small>
                    </span>
                </div>
                <Button type="submit" label="Update" class="w-full p-3 text-xl mt-5" />
            </div>
        </form>

        <Loading v-if="loading" />
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useEditVillage } from './useEdit'
import Loading from '@/components/Loading.vue'

const { loading, errors, v$, handleSubmit, submitted } = useEditVillage()
</script>

<style scoped></style>
