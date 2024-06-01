import { defineStore } from 'pinia'
import { authService } from './service'
import router from '@/router'

export const useAuthStore = defineStore({
    id: 'useAuthStore',
    state: () => ({
        token: localStorage.getItem('accessToken') || null,
        loginResponse: null,
        loginError: null
    }),

    getters: {
        getToken(state) {
            return state.token ? state.token : null
        },
        getLoginResponse(state) {
            return state.loginResponse
        },
        getLoginError(state) {
            return state.loginError
        },
        isAuth(state) {
            return state.token ? true : false
        }
    },

    actions: {
        onCreated() {
            this.token = localStorage.getItem('accessToken') || null
        },
        async login(params) {
            const response = await authService.login(params)
            this.loginResponse = response
        },
        async logout() {
            await authService.logout()
            this.clearLocalStorage()
            router.push({ name: 'login' })
        },
        setLoginError(message) {
            this.loginError = message
        },
        saveToLocalStorage(token, user) {
            localStorage.setItem('accessToken', token)
            localStorage.setItem('user', JSON.stringify(user))
        },
        clearLocalStorage() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')
        }
    }
})
