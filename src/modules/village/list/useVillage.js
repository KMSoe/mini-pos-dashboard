import { ref, onMounted, watch } from 'vue'
import { useVillageStore } from '../store'

export const useVillage = () => {
    const villages = ref()
    const limit = ref(10)
    const dt = ref()
    const params = ref({})
    const totalRecords = ref(0)
    const search = ref(null)

    let timeoutId

    const loading = ref(false)
    const store = useVillageStore()

    const columns = ref([{ field: 'name', header: 'Name' }])

    onMounted(() => {
        resetPagination()
        getVillageList()
    })

    const getVillageList = async () => {
        loading.value = true

        try {
            await store.fetchVillages()

            const response = store.getVillages

            if (response) {
                villages.value = response.villages.data
                totalRecords.value = response.villages.total
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    const resetPagination = () => {
        params.value = {
            page: 1,
            rows: dt.value.rows
        }
    }

    const onPage = (event) => {
        params.value = event
        params.value.page = event.first / event.rows
        params.value.page += 1
        getVillageList()
    }

    watch([search], () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            filterSearch()
        }, 500)
    })

    const filterSearch = () => {
        resetPagination()
        getVillageList()
    }

    return {
        columns,
        loading,
        villages,
        limit,
        dt,
        params,
        totalRecords,
        onPage,
        search,
        filterSearch
    }
}
