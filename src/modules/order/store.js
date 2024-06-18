import { defineStore } from 'pinia'
import { service } from './service'

export const useOrderStore = defineStore({
    id: 'useOrderStore',
    state: () => ({
        orderList: null,
        orderPageData: null,
        newOrder: null,
        newCustomer: null
    }),

    getters: {
        getOrderList(state) {
            return state.orderList
        },
        getOrderPageData(state) {
            return state.orderPageData
        },
        getNewOrder(state) {
            return state.newOrder
        },
        getNewCustomer(state) {
            return state.newCustomer
        }
    },

    actions: {
        async fetchOrders(params) {
            this.orderList = await service.getOrders(params)
        },
        async fetchOrderPageData() {
            this.orderPageData = await service.getOrderPageData()
        },
        async addNewOrder(params) {
            this.newOrder = await service.createOrder(params)
        },
        async addNewCustomer(params) {
            this.newCustomer = await service.createCustomer(params)
        }
    }
})
