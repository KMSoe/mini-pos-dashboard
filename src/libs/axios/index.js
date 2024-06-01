import axios from 'axios'
import EventBus from '@/libs/AppEventBus'
import { useAuthStore } from '@/modules/auth/store'
import router from '@/router'

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Accept: 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    }
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }

    return config
})

api.interceptors.response.use(
    (res) => {
        if (res.config.method !== 'get') {
            if (res.data.message !== '') showToast(res.data.message, 'info')
        }

        return res
    },
    (err) => {
        if (err.response) {
            const store = useAuthStore()

            if (err.response.status === 401) {
                store.clearLocalStorage()
                router.push({ name: 'login' })
            } else if (err.response.status === 403) {
                store.clearLocalStorage()
                router.push({ name: 'login' })
            } else if (err.response.status === 422) {
                return Promise.reject(err.response)
            } else if (err.response.status === 404) {
                router.push({ name: 'error404' })
            }

            if (err.response.config.url === '/auth/login') {
                store.setLoginError(err.response.data.message)

                return Promise.reject(err.response)
            } else {
                showToast(err.response.data.message)
            }
        } else if (err.request) {
            showToast(err.message)
        } else {
            showToast(err.message)
        }
        if (err.code === 'ERR_NETWORK') {
            showToast(err.message)
        }
    }
)

function showToast(message, type = 'error') {
    EventBus.emit('show-toast', {
        severity: type,
        summary: '',
        detail: message
    })
}

export default api
