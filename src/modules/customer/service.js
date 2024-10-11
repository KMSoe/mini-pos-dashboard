import api from '@/libs/axios'

const service = {
    getCustomers: async (params) => {
        const customers = await api.get(
            `/customers?village_id=${params.village_id}&search=${params.search}&page=${params.page}&limit=${params.limit}`
        )

        return customers.data
    },
    getCustomer: async (id) => {
        const response = await api.get(`/customers/${id}`)

        return response.data.data.customer
    },
    getVillages: async () => {
        const villages = await api.get('customers-page-data')

        return villages.data
    },
    createCustomer: async (params) => {
        const customers = await api.post('/customers', params)

        return customers.data
    },
    updateCustomer: async (params) => {
        const response = await api.put(`/customers/${params.id}`, params)

        return response.data.customer
    }
}

export { service }
