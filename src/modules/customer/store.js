import { defineStore } from 'pinia'
import { service } from './service'

export const useCustomerStore = defineStore({
    id: 'useCustomerStore',
    state: () => ({
        listCustomers: null
    }),

    getters: {
        getCustomerList(state) {
            return state.listCustomers
        }
    },

    actions: {
        async getCustomers(params) {
            this.listCustomers = await service.getCustomers(params)
        }
    }
})
