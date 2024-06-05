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

        <DataTable
            ref="dt"
            datakey="id"
            :value="customers"
            :loading="loading"
            stripedRows
            :lazy="true"
            :paginator="true"
            @page="onPage($event)"
            :totalRecords="totalRecords"
            :rows="10"
        >
            <template #header>
                <div class="flex justify-content-end gap-1">
                    <Dropdown
                        v-model="selectedVillage"
                        :options="villages"
                        optionLabel="name"
                        optionValue="id"
                        showClear
                        placeholder="Select a village"
                    />

                    <IconField iconPosition="left">
                        <InputIcon>
                            <i class="pi pi-search" />
                        </InputIcon>
                        <InputText
                            placeholder="Keyword Search"
                            v-model="search"
                            @keydown.enter="filterSearch"
                        />
                    </IconField>

                    <Button label="Add Customer" />
                </div>
            </template>

            <template #empty> No Customers found.</template>
            <template #loading> Loading Customers data. Please wait.</template>

            <Column
                v-for="column in columns"
                :key="column.field"
                :field="column.field"
                :header="column.header"
                :sortable="column.sortable"
            />
        </DataTable>

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
import Button from 'primevue/button'
import Loading from '@/components/Loading.vue'
import { useCustomer } from './useCustomer'

const {
    items,
    customers,
    columns,
    loading,
    villages,
    selectedVillage,
    dt,
    totalRecords,
    onPage,
    search,
    filterSearch
} = useCustomer()
</script>

<style lang="scss" scoped></style>
