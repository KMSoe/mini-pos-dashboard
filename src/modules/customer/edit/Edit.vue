<template>
    <div class="card mt-2 bg-white p-5">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="fadeinout animation-duration-500">
            <div class="w-full mx-auto">
                <!-- Customer -->
                <div class="p-field mb-4">
                    <label for="customer" :class="{ 'p-error': v$.name.$invalid && submitted }"
                        >Name</label
                    >
                    <InputText
                        v-model="v$.name.$model"
                        id="customer"
                        type="text"
                        class="w-full"
                        placeholder="Customer Name"
                        :class="{ 'p-invalid': v$.name.$invalid && submitted }"
                    />

                    <span
                        v-if="(v$.name.$invalid && submitted) || v$.name.$pending.$response"
                        class="p-error"
                    >
                        <small>{{
                            v$.name.required.$message.replace('Value', 'Customer Name')
                        }}</small>
                    </span>
                </div>

                <!-- Village Name -->
                <div class="p-field mb-4">
                    <label for="village">Village</label>
                    <Dropdown
                        v-model="selectedVillage"
                        :options="villages"
                        optionLabel="name"
                        optionValue="id"
                        class="w-full"
                    />
                </div>

                <!-- First Phone Number -->
                <div class="p-field mb-4">
                    <label
                        for="ph.no"
                        :class="{ 'p-error': v$.first_phone_number.$invalid && submitted }"
                        >First Phone Number</label
                    >
                    <InputText
                        type="number"
                        v-model="v$.first_phone_number.$model"
                        class="w-full"
                        placeholder="9123456789"
                        :class="{ 'p-invalid': v$.first_phone_number.$invalid && submitted }"
                    />

                    <span
                        v-if="
                            (v$.first_phone_number.$invalid && submitted) ||
                            v$.first_phone_number.$pending.$response
                        "
                        class="p-error"
                    >
                        <small>{{
                            v$.first_phone_number.required.$message.replace('Value', 'Phone Number')
                        }}</small>
                    </span>
                </div>

                <!-- Second Phone Number -->
                <div class="p-field mb-4">
                    <label for="second_ph.no">Second Phone Number</label>
                    <InputText
                        type="number"
                        v-model="v$.second_phone_number.$model"
                        class="w-full"
                        placeholder="9123456789"
                    />
                </div>

                <Button type="submit" label="Update Customer" class="w-full p-3 text-xl mt-5" />
            </div>
        </form>

        <Loading v-if="loading" />
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useEditCustomer } from './useEdit'
import Loading from '@/components/Loading.vue'

const { loading, villages, selectedVillage, v$, handleSubmit, submitted } = useEditCustomer()
</script>

<style scoped></style>
