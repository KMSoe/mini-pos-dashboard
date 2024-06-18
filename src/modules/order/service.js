import api from '@/libs/axios'

const service = {
    getOrders: async (params) => {
        const orders = await api.get(
            `/orders?village_id=${params.village_id}&search=${params.search}&page=${params.page}&limit=${params.limit}`
        )

        return orders.data
    },
    getOrderPageData: async () => {
        const data = await api.get('orders-page-data')

        return data.data
    },
    createOrder: async (params) => {
        const orders = await api.post('/orders', params)

        return orders.data
    },
    createCustomer: async (params) => {
        const response = await api.post('/customers', params)

        return response.data
    }
}

export { service }
