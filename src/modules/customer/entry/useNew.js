import { ref, onMounted, reactive } from 'vue'
import { useCustomerStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

export const useNewCustomer = () => {
    const villages = ref()
    const selectedVillage = ref(null)
    const loading = ref(false)
    const store = useCustomerStore()
    const submitted = ref(false)
    const router = new useRouter()

    onMounted(() => {
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

        createCustomer()
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

    const createCustomer = async () => {
        loading.value = true

        try {
            await store.addNewCustomer({
                name: state.name,
                village_id: selectedVillage.value,
                first_phone_number: state.first_phone_number,
                second_phone_number: state.second_phone_number
            })

            const response = store.getNewCustomer

            if (response) {
                await router.push({ name: 'customer' })
            }
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
