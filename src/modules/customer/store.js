import { defineStore } from 'pinia'
import { service } from './service'

export const useCustomerStore = defineStore({
    id: 'useCustomerStore',
    state: () => ({
        customerList: null,
        villageList: null
    }),

    getters: {
        getCustomerList(state) {
            return state.customerList
        },
        getVillageList(state) {
            return state.villageList
        }
    },

    actions: {
        async fetchCustomers(params) {
            this.customerList = await service.getCustomers(params)
        },
        async fetchVillages() {
            this.villageList = await service.getVillages()
        }
    }
})
