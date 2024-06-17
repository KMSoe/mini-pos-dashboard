import { defineStore } from 'pinia'
import { service } from './service'

export const useOrderStore = defineStore({
    id: 'useOrderStore',
    state: () => ({
        orderList: null,
        orderPageData: null,
        newOrder: null
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
        }
    }
})
