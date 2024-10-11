import api from '@/libs/axios'

const service = {
    getOrders: async (params) => {
        const orders = await api.get(
            `/orders?village_id=${params.village_id}&search=${params.search}&page=${params.page}&limit=${params.limit}`
        )

        return orders.data
    },
    getOrder: async (id) => {
        const response = await api.get(`/orders/${id}`)

        return response.data.data.order
    },
    getOrderPageData: async () => {
        const data = await api.get('orders-page-data')

        return data.data
    },
    createOrder: async (params) => {
        const orders = await api.post('/orders', params)

        return orders.data
    },
    updateOrder: async (params) => {
        const response = await api.put(`/orders/${params.id}`, params)

        return response.data.data.order
    },
    deleteOrder: async (id) => {
        const response = await api.delete(`/orders/${id}`)

        return response
    },
    createCustomer: async (params) => {
        const response = await api.post('/customers', params)

        return response.data
    }
}

export { service }
