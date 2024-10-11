import { defineStore } from 'pinia'
import { service } from './service'

export const useOrderStore = defineStore({
    id: 'useOrderStore',
    state: () => ({
        orderList: null,
        orderPageData: null,
        newOrder: null,
        order: null,
        newCustomer: null
    }),

    getters: {
        getOrderList(state) {
            return state.orderList
        },
        getOrder(state) {
            return state.order
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
        async fetchOrder(id) {
            this.order = await service.getOrder(id)
        },
        async fetchOrderPageData() {
            this.orderPageData = await service.getOrderPageData()
        },
        async addNewOrder(params) {
            this.newOrder = await service.createOrder(params)
        },
        async updateOrder(params) {
            this.order = await service.updateOrder(params)
        },
        async deleteOrder(id) {
            await service.deleteOrder(id)
        },
        async addNewCustomer(params) {
            this.newCustomer = await service.createCustomer(params)
        }
    }
})
