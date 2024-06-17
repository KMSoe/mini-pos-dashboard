<template>
    <div class="card">
        <!-- <Breadcrumb :model="items" class="mb-3">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <a :href="href" v-bind="props.action" @click="navigate">
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </a>
                </router-link>
            </template>
</Breadcrumb> -->

        <DataTable
            ref="dt"
            datakey="id"
            :value="orders"
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
                            placeholder="Customer Name"
                            v-model="search"
                            @keydown.enter="filterSearch"
                        />
                    </IconField>

                    <router-link :to="{ name: 'add-order' }">
                        <Button label="Add Order" />
                    </router-link>
                </div>
            </template>

            <template #empty> No Order found.</template>
            <template #loading> Loading Orders data. Please wait.</template>

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
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import IconField from 'primevue/iconfield'
import InputIcon from 'primevue/inputicon'
import InputText from 'primevue/inputtext'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import Loading from '@/components/Loading.vue'
import { useOrder } from './useOrder'

const {
    orders,
    columns,
    loading,
    villages,
    selectedVillage,
    dt,
    totalRecords,
    onPage,
    search,
    filterSearch
} = useOrder()
</script>

<style lang="scss" scoped></style>
