import api from '@/libs/axios'

const service = {
    getAll: async (params) => {
        const response = await api.get('villages', params)

        return response.data
    },
    get: async (id) => {
        const response = await api.get(`villages/${id}`)

        return response.data.village
    },
    create: async (params) => {
        const response = await api.post('/villages', params)

        return response.data.village
    },
    update: async (params) => {
        const response = await api.put(`/villages/${params.id}`, params)

        return response.data.village
    }
}

export { service }
