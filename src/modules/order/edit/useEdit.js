import { ref, onMounted, reactive } from 'vue'
import { useOrderStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router'

export const useEditOrder = () => {
    const route = useRoute()
    const customer_type = ref('existing')
    const orderFormErrors = ref(null)
    const customers = ref()
    const villages = ref()
    const loading = ref(false)
    const store = useOrderStore()
    const submitted = ref(false)
    const router = new useRouter()

    onMounted(() => {
        getOrderPageData()
        getOrder(route.params.id)
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

    const getOrder = async (id) => {
        loading.value = true

        try {
            await store.fetchOrder(id)

            const result = store.getOrder

            if (result) {
                orderState.customer_id = result.customer_id
                orderState.voucher_code = result.voucher_code
                orderState.date = result.date
                orderState.voucher_amount = result.voucher_amount
                orderState.purchase_amount = result.purchase_amount
                orderState.will_purchase_date = result.will_purchase_date
                orderState.remark = result.remark
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
                customers.value = [...customers.value, response.customer]
                orderState.customer_id = response.customer.id
                customer_type.value = 'existing'
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

        updateOrder()
    }

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear()

        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day

        return [year, month, day].join('-')
    }

    const updateOrder = async () => {
        loading.value = true

        try {
            await store.updateOrder({
                id: route.params.id,
                customer_id: orderState.customer_id,
                voucher_code: orderState.voucher_code,
                date: formatDate(orderState.date),
                voucher_amount: orderState.voucher_amount,
                purchase_amount: orderState.purchase_amount,
                will_purchase_date: formatDate(orderState.will_purchase_date),
                remark: orderState.remark
            })

            const response = store.getNewOrder

            if (response) {
                await router.push({ name: 'order' })
            }
        } catch (error) {
            loading.value = false
            if (error.status == 422) {
                orderFormErrors.value = error.data.errors
            }
        }

        loading.value = false
    }

    return {
        customer_type,
        orderFormErrors,
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
