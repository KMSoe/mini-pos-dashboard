import { ref, onMounted, watch } from 'vue'
import { useOrderStore } from '../store'

export const useOrder = () => {
    const orders = ref()
    const villages = ref()
    const customers = ref()
    const selectedVillage = ref(null)
    const limit = ref(10)
    const dt = ref()
    const params = ref({})
    const totalRecords = ref(0)
    const search = ref(null)

    let timeoutId

    const loading = ref(false)
    const store = useOrderStore()

    const items = ref([
        { label: 'Dashboard', route: '/' },
        { label: 'Order', route: 'order' }
    ])

    const columns = ref([
        { field: 'customer_name', header: 'Customer' },
        { field: 'village_name', header: 'Village' },
        { field: 'voucher_code', header: 'Voucher Code' },
        { field: 'date', header: 'Date' },
        { field: 'voucher_amount', header: 'Vocuher Amount' },
        { field: 'purchase_amount', header: 'Purchase Amount' },
        { field: 'will_purchase_date', header: 'Will Purchase Date' },
        { field: 'remark', header: 'Remark' }
    ])

    onMounted(() => {
        resetPagination()
        getOrderList()
        getOrderPageData()
    })

    const getOrderList = async () => {
        loading.value = true

        try {
            await store.fetchOrders({
                limit: params.value.rows,
                page: params.value.page,
                village_id: selectedVillage.value ? selectedVillage.value : 'all',
                search: search.value ? search.value : ''
            })

            const response = store.getOrderList

            if (response) {
                orders.value = response.orders.data
                totalRecords.value = response.orders.total
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    const getOrderPageData = async () => {
        loading.value = true

        try {
            await store.fetchOrderPageData()

            const response = store.getOrderPageData

            if (response) {
                villages.value = response.villages
                customers.value = response.customers
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    watch(selectedVillage, () => {
        getOrderList()
    })

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
        getOrderList()
    }

    watch([search], () => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            filterSearch()
        }, 500)
    })

    const filterSearch = () => {
        resetPagination()
        getOrderList()
    }

    return {
        items,
        orders,
        customers,
        columns,
        loading,
        villages,
        selectedVillage,
        limit,
        dt,
        params,
        totalRecords,
        onPage,
        search,
        filterSearch
    }
}
