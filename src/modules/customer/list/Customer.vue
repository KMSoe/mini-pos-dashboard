<template>
    <div class="card">
        <Breadcrumb :model="items" class="mb-3">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
        </Breadcrumb>

        <DataTable :value="customers" :loading="loading" stripedRows removableSort>
            <template #header>
                <div class="flex justify-content-end">
                    <Dropdown v-model="selectedVillage" :options="villages" optionLabel="name" optionValue="id"
                        placeholder="Select a village" />

                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText placeholder="Keyword Search" />
                    </IconField>
                </div>
            </template>

            <template #empty> No Customers found.</template>
            <template #loading> Loading Customers data. Please wait.</template>

            <Column v-for="column in columns" :key="column.field" :field="column.field" :header="column.header"
                :sortable="column.sortable" />
        </DataTable>

        <!-- <Bootstrap5Pagination :data="customerObject" @pagination-change-page="getCustomerList" /> -->

        <Loading v-if="loading" />
    </div>
</template>


<script setup>
import Breadcrumb from 'primevue/breadcrumb'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Loading from '@/components/Loading.vue'
import { useCustomer } from './useCustomer'
import { Bootstrap5Pagination } from 'laravel-vue-pagination'

const { items, customers, columns, loading, villages, selectedVillage, customerObject, getCustomerList } = useCustomer()
</script>

<style lang="scss" scoped></style>