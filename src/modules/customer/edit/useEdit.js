import { ref, onMounted, reactive } from 'vue'
import { useCustomerStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRoute } from 'vue-router'

export const useEditCustomer = () => {
    const route = useRoute()

    const villages = ref()
    const selectedVillage = ref(null)
    const loading = ref(false)
    const store = useCustomerStore()
    const submitted = ref(false)

    onMounted(() => {
        fetchCustomer(route.params.id)
        getVillageList()
    })

    const state = reactive({
        name: '',
        first_phone_number: null,
        second_phone_number: null
    })

    const rules = {
        name: { required },
        first_phone_number: { required },
        second_phone_number: {}
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) {
            return
        }

        updateCustomer()
    }

    const fetchCustomer = async (id) => {
        loading.value = true

        try {
            await store.fetchCustomer(id)

            const response = store.customer

            if (response) {
                state.name = response.name
                state.first_phone_number = response.first_phone_number
                state.second_phone_number = response.second_phone_number
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
                selectedVillage.value = villages.value[0].id
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    const updateCustomer = async () => {
        loading.value = true

        try {
            await store.updateCustomer({
                id: route.params.id,
                name: state.name,
                village_id: selectedVillage.value,
                first_phone_number: state.first_phone_number,
                second_phone_number: state.second_phone_number
            })
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    return {
        loading,
        villages,
        selectedVillage,
        v$,
        handleSubmit,
        submitted
    }
}
