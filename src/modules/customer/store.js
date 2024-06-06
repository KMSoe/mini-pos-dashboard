import { defineStore } from 'pinia'
import { service } from './service'

export const useCustomerStore = defineStore({
    id: 'useCustomerStore',
    state: () => ({
        customerList: null,
        villageList: null,
        newCustomer: null
    }),

    getters: {
        getCustomerList(state) {
            return state.customerList
        },
        getVillageList(state) {
            return state.villageList
        },
        getNewCustomer(state) {
            return state.newCustomer
        }
    },

    actions: {
        async fetchCustomers(params) {
            this.customerList = await service.getCustomers(params)
        },
        async fetchVillages() {
            this.villageList = await service.getVillages()
        },
        async addNewCustomer(params) {
            this.newCustomer = await service.createCustomer(params)
        }
    }
})
