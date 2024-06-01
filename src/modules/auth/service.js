import api from '@/libs/axios'

const authService = {
    login: async (params) => {
        const result = await api.post('/auth/login', params)

        return result
    },
    logout: async () => {
        const result = await api.post('/auth/logout')

        return result.data
    }
}

export { authService }
