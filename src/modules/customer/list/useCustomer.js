import { ref, onMounted, computed, watch } from 'vue'
import { useCustomerStore } from '../store'

export const useCustomer = () => {
    const customers = ref()
    const villages = ref()
    const selectedVillage = ref(null)
    const limit = ref(10)
    const dt = ref()
    const params = ref({})
    const totalRecords = ref(0)

    const loading = ref(false)
    const store = useCustomerStore()

    const items = ref([
        { label: 'Dashboard', route: '/' },
        { label: 'Customer', route: 'customer' }
    ])

    const columns = ref([
        { field: 'name', header: 'Customer', sortable: true },
        { field: 'village_name', header: 'Village', sortable: true },
        { field: 'first_phone_number', header: 'First Phone Number', sortable: true },
        { field: 'second_phone_number', header: 'Second Phone Number', sortable: true },
        { field: 'order_count', header: 'Order Count', sortable: true },
        { field: 'order_amount', header: 'Order Amount', sortable: true },
        { field: 'purchase_amount', header: 'Purchase Amount', sortable: true },
        { field: 'last_order_date', header: 'Last Order Date', sortable: false },
        { field: 'last_purchase_date', header: 'Last Purchase Date', sortable: false },
        { field: 'remark', header: 'Remark', sortable: false },
        { field: 'created_at', header: 'Created At', sortable: false }
    ])

    onMounted(() => {
        resetPagination()
        getCustomerList()
        getVillageList()
    })

    const getCustomerList = async () => {
        loading.value = true

        try {
            await store.fetchCustomers({
                limit: params.value.rows,
                page: params.value.page,
                village_id: selectedVillage.value ? selectedVillage.value : 'all',
                search: ''
            })

            const response = store.getCustomerList

            if (response) {
                customers.value = response.customers.data
                totalRecords.value = response.customers.total
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    const getVillageList = async () => {
        loading.value = true

        try {
            await store.fetchVillages()

            const response = store.getVillageList

            if (response) {
                villages.value = response.villages
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    watch(selectedVillage, () => {
        getCustomerList()
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
        getCustomerList()
    }

    return {
        items,
        customers,
        columns,
        loading,
        villages,
        selectedVillage,
        limit,
        dt,
        params,
        totalRecords,
        onPage
    }
}
