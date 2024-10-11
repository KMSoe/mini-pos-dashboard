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
            :value="villages"
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

                    <router-link :to="{ name: 'village-create' }">
                        <Button label="Add Village" />
                    </router-link>
                </div>
            </template>

            <template #empty> No Villages found.</template>
            <template #loading> Loading Villages data. Please wait.</template>

            <Column
                v-for="column in columns"
                :key="column.field"
                :field="column.field"
                :header="column.header"
                :sortable="column.sortable"
            />
            <Column field="action" header="Action">
                <template #body="slotProps">
                    <router-link :to="{ name: 'village-edit', params: { id: slotProps.data.id } }">
                        <Button icon="pi pi-pencil" class="m-1" />
                    </router-link>
                </template>
            </Column>
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
import Button from 'primevue/button'
import Loading from '@/components/Loading.vue'
import { useVillage } from './useVillage'

const { columns, loading, villages, dt, totalRecords, onPage, search, filterSearch } = useVillage()
</script>

<style lang="scss" scoped></style>
