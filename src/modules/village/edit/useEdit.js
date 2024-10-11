import { ref, onMounted, reactive } from 'vue'
import { useVillageStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRoute, useRouter } from 'vue-router'

export const useEditVillage = () => {
    const route = useRoute()

    const loading = ref(false)
    const store = useVillageStore()
    const submitted = ref(false)
    const router = new useRouter()
    const errors = ref({})

    onMounted(() => {
        fetchVillage(route.params.id)
    })

    const state = reactive({
        name: ''
    })

    const rules = {
        name: { required }
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) {
            return
        }

        updateVillage()
    }

    const fetchVillage = async (id) => {
        loading.value = true

        try {
            const village = await store.fetchVillage(id)

            if (village) {
                state.name = village.name
            }
        } catch (error) {
            loading.value = false
            errors.value = error
        }

        loading.value = false
    }

    const updateVillage = async () => {
        loading.value = true

        try {
            const response = await store.updateVillage({
                id: route.params.id,
                name: state.name
            })

            if (response) {
                await router.push({ name: 'village' })
            }
        } catch (error) {
            loading.value = false
            errors.value = error
        }

        loading.value = false
    }

    return {
        loading,
        errors,
        v$,
        handleSubmit,
        submitted
    }
}
