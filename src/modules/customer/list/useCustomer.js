import { ref, onMounted, computed, watch } from 'vue'
import { useCustomerStore } from '../store'

export const useCustomer = () => {
    const customers = ref()
    const customerObject = ref()
    const villages = ref()
    const selectedVillage = ref('all')
    const limit = ref(10)

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
        getCustomerList()
        getVillageList()
    })

    const getCustomerList = async (page = 1) => {
        loading.value = true

        try {
            await store.fetchCustomers({
                village_id: selectedVillage.value,
                search: '',
                limit: limit,
                page
            })

            const response = store.getCustomerList

            if (response) {
                customers.value = response.customers.data
                customerObject.value = response.customers
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

    return {
        items,
        customers,
        columns,
        loading,
        villages,
        selectedVillage,
        limit,
        customerObject,
        getCustomerList
    }
}
