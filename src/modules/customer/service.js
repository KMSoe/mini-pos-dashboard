import api from '@/libs/axios'

const service = {
    getCustomers: async (params) => {
        const customers = await api.get(
            `/customers?village_id=${params.village_id}&search=${params.search}`
        )

        return customers.data
    }
}

export { service }
