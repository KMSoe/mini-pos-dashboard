import { defineStore } from 'pinia'
import { service } from './service'

export const useCustomerStore = defineStore({
    id: 'useCustomerStore',
    state: () => ({
        customerList: null,
        villageList: null,
        newCustomer: null,
        customer: null
    }),

    getters: {
        getCustomerList(state) {
            return state.customerList
        },
        getCustomer(state) {
            return state.customer
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
        async fetchCustomer(id) {
            this.customer = await service.getCustomer(id)
        },
        async fetchVillages() {
            this.villageList = await service.getVillages()
        },
        async addNewCustomer(params) {
            this.newCustomer = await service.createCustomer(params)
        },
        async updateCustomer(params) {
            return await service.updateCustomer(params)
        }
    }
})
