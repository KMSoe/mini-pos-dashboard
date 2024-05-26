import { ref, onMounted, computed } from 'vue'
import { useCustomerStore } from '../store'

export const useCustomer = () => {
    const customers = ref()
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

    onMounted(async () => {
        await getCustomerList()
    })

    const getCustomerList = async () => {
        loading.value = true

        try {
            await store.getCustomers({
                village_id: 'all',
                search: ''
            })

            const response = store.getCustomerList

            if (response) {
                customers.value = response.data.customers.data
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    return {
        items,
        customers,
        columns,
        loading
    }
}
