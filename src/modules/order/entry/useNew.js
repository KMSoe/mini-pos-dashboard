import { ref, onMounted, reactive } from 'vue'
import { useOrderStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

export const useNewOrder = () => {
    const customer_type = ref('existing')
    const customers = ref()
    const villages = ref()
    const loading = ref(false)
    const store = useOrderStore()
    const submitted = ref(false)
    const router = new useRouter()

    onMounted(() => {
        getOrderPageData()
        // getVillageList()
    })

    const orderState = reactive({
        customer_id: '',
        voucher_code: null,
        date: null,
        voucher_amount: null,
        purchase_amount: null,
        will_purchase_date: null,
        remark: null
    })

    const orderRules = {
        customer_id: { required },
        voucher_code: {},
        date: {},
        voucher_amount: { required },
        purchase_amount: { required },
        will_purchase_date: {},
        remark: {}
    }

    const v$ = useVuelidate(orderRules, orderState)

    const customerRules = {
        name: { required },
        village_id: { required },
        first_phone_number: { required },
        second_phone_number: {}
    }

    const customerState = reactive({
        name: '',
        village_id: null,
        first_phone_number: null,
        second_phone_number: null
    })

    const v$1 = useVuelidate(customerRules, customerState)

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

    const createCustomer = async () => {
        try {
            await store.addNewCustomer({
                name: customerState.name,
                village_id: customerState.village_id,
                first_phone_number: customerState.first_phone_number,
                second_phone_number: customerState.second_phone_number
            })

            const response = store.getNewCustomer

            if (response) {
                console.log(response)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) {
            return
        }

        createOrder()
    }

    const createOrder = async () => {
        loading.value = true

        try {
            await store.addNewOrder({})

            const response = store.getNewOrder

            if (response) {
                await router.push({ name: 'order' })
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    return {
        customer_type,
        customers,
        villages,
        createCustomer,
        loading,
        v$,
        v$1,
        handleSubmit,
        submitted
    }
}
