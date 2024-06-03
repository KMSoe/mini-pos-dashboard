import api from '@/libs/axios'

const service = {
    getCustomers: async (params) => {
        const customers = await api.get(
            `/customers?village_id=${params.village_id}&search=${params.search}&page=${params.page}&limit=${params.limit}`
        )

        return customers.data
    },
    getVillages: async () => {
        const villages = await api.get('customers-page-data')

        return villages.data
    }
}

export { service }
