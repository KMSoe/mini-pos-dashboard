import { defineStore } from 'pinia'
import { service } from './service'

export const useVillageStore = defineStore({
    id: 'useVillageStore',
    state: () => ({
        villages: null,
        village: null
    }),

    getters: {
        getVillages(state) {
            return state.villages
        }
    },

    actions: {
        async fetchVillages(params) {
            this.villages = await service.getAll(params)
        },
        async fetchVillage(id) {
            return await service.get(id)
        },
        async addNewVillage(params) {
            return await service.create(params)
        },
        async updateVillage(params) {
            return await service.update(params)
        }
    }
})
