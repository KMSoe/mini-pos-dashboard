<template>
    <div class="card mt-2 bg-white p-5">
        <form @submit.prevent="handleSubmit(!v$.$invalid)" class="fadeinout animation-duration-500">
            <div class="w-full mx-auto">
                <!-- Customer -->
                <div class="p-field mb-4">
                    <div class="flex flex-wrap gap-4">
                        <div class="flex items-center">
                            <RadioButton
                                v-model="customer_type"
                                inputId="existing"
                                name="pizza"
                                value="existing"
                            />
                            <label for="existing" class="ml-2">Existing Customer</label>
                        </div>
                        <div class="flex items-center">
                            <RadioButton
                                v-model="customer_type"
                                inputId="new"
                                name="pizza"
                                value="new"
                            />
                            <label for="new" class="ml-2">New Customer</label>
                        </div>
                    </div>
                </div>

                <div v-if="customer_type == 'existing'" class="p-field mb-4">
                    <label for="customer_id">Customer</label>
                    <Dropdown
                        v-model="v$.customer_id.$model"
                        :options="customers"
                        optionLabel="name"
                        optionValue="id"
                        class="w-full"
                    />
                </div>
                <div v-else class="w-full mx-auto">
                    <!-- Customer -->
                    <div class="p-field mb-4">
                        <label for="customer" :class="{ 'p-error': v$1.name.$invalid && submitted }"
                            >Name</label
                        >
                        <InputText
                            v-model="v$1.name.$model"
                            id="customer"
                            type="text"
                            class="w-full"
                            placeholder="Customer Name"
                            :class="{ 'p-invalid': v$1.name.$invalid && submitted }"
                        />

                        <span
                            v-if="(v$1.name.$invalid && submitted) || v$1.name.$pending.$response"
                            class="p-error"
                        >
                            <small>{{
                                v$1.name.required.$message.replace('Value', 'Customer Name')
                            }}</small>
                        </span>
                    </div>

                    <!-- Village Name -->
                    <div class="p-field mb-4">
                        <label for="village">Village</label>
                        <Dropdown
                            v-model="v$1.village_id.$model"
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
                            :class="{ 'p-error': v$1.first_phone_number.$invalid && submitted }"
                            >First Phone Number</label
                        >
                        <InputText
                            type="number"
                            v-model="v$1.first_phone_number.$model"
                            class="w-full"
                            placeholder="9123456789"
                            :class="{ 'p-invalid': v$1.first_phone_number.$invalid && submitted }"
                        />

                        <span
                            v-if="
                                (v$1.first_phone_number.$invalid && submitted) ||
                                v$1.first_phone_number.$pending.$response
                            "
                            class="p-error"
                        >
                            <small>{{
                                v$1.first_phone_number.required.$message.replace(
                                    'Value',
                                    'Phone Number'
                                )
                            }}</small>
                        </span>
                    </div>

                    <!-- Second Phone Number -->
                    <div class="p-field mb-4">
                        <label for="second_ph.no">Second Phone Number</label>
                        <InputText
                            type="number"
                            v-model="v$1.second_phone_number.$model"
                            class="w-full"
                            placeholder="9123456789"
                        />
                    </div>

                    <Button
                        @click.prevent="createCustomer"
                        label="Create Customer"
                        class="p-3 text-xl mt-5"
                    />
                </div>

                <div class="p-field mb-4">
                    <label
                        for="voucher_code"
                        :class="{ 'p-error': v$.voucher_code.$invalid && submitted }"
                        >Voucher Code</label
                    >
                    <InputText
                        type="text"
                        v-model="v$.voucher_code.$model"
                        class="w-full"
                        placeholder="order 101"
                        :class="{ 'p-invalid': v$.voucher_code.$invalid && submitted }"
                    />

                    <span
                        v-if="
                            (v$.voucher_code.$invalid && submitted) ||
                            v$.voucher_code.$pending.$response
                        "
                        class="p-error"
                    >
                        <small>{{
                            v$.voucher_code.required.$message.replace('Value', 'Voucher Code')
                        }}</small>
                    </span>
                </div>
                <div class="p-field mb-4">
                    <label for="date" :class="{ 'p-error': v$.date.$invalid && submitted }"
                        >Date</label
                    >
                    <!-- <DatePicker v-model="v$.date.$model" showIcon class="w-full"/> -->
                </div>

                <div class="p-field mb-4">
                    <label
                        for="voucher_amount"
                        :class="{ 'p-error': v$.voucher_amount.$invalid && submitted }"
                        >Voucher Amount</label
                    >
                    <InputText
                        type="number"
                        v-model="v$.voucher_amount.$model"
                        class="w-full"
                        placeholder="100000"
                        :class="{ 'p-invalid': v$.voucher_amount.$invalid && submitted }"
                    />

                    <span
                        v-if="
                            (v$.voucher_amount.$invalid && submitted) ||
                            v$.voucher_amount.$pending.$response
                        "
                        class="p-error"
                    >
                        <small>{{
                            v$.voucher_code.required.$message.replace('Value', 'Voucher Code')
                        }}</small>
                    </span>
                </div>

                <div class="p-field mb-4">
                    <label
                        for="purchase_amount"
                        :class="{ 'p-error': v$.purchase_amount.$invalid && submitted }"
                        >Purchase Amount</label
                    >
                    <InputText
                        type="number"
                        v-model="v$.purchase_amount.$model"
                        class="w-full"
                        placeholder="100000"
                        :class="{ 'p-invalid': v$.purchase_amount.$invalid && submitted }"
                    />

                    <span
                        v-if="
                            (v$.purchase_amount.$invalid && submitted) ||
                            v$.purchase_amount.$pending.$response
                        "
                        class="p-error"
                    >
                        <small>{{
                            v$.voucher_code.required.$message.replace('Value', 'Voucher Code')
                        }}</small>
                    </span>
                </div>
                <div class="p-field mb-4">
                    <label for="remark" :class="{ 'p-error': v$.remark.$invalid && submitted }"
                        >Remark</label
                    >
                    <Textarea v-model="v$.remark.$model" class="w-full" rows="5" />
                </div>

                <Button type="submit" label="Create Order" class="w-full p-3 text-xl mt-5" />
            </div>
        </form>

        <Loading v-if="loading" />
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import RadioButton from 'primevue/radiobutton'
import Textarea from 'primevue/textarea'
// import DatePicker from 'primevue/datepicker';
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useNewOrder } from './useNew'
import Loading from '@/components/Loading.vue'

const {
    loading,
    customers,
    villages,
    customer_type,
    createCustomer,
    v$,
    v$1,
    handleSubmit,
    submitted
} = useNewOrder()
</script>

<style scoped></style>
