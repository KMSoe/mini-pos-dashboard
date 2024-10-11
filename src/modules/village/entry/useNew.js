import { ref, reactive } from 'vue'
import { useVillageStore } from '../store'
import { required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import { useRouter } from 'vue-router'

export const useNewVillage = () => {
    const loading = ref(false)
    const store = useVillageStore()
    const submitted = ref(false)
    const router = new useRouter()

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

        createVillage()
    }

    const createVillage = async () => {
        loading.value = true

        try {
            const response = await store.addNewVillage({
                name: state.name
            })

            if (response) {
                await router.push({ name: 'village' })
            }
        } catch (error) {
            loading.value = false
            console.log(error)
        }

        loading.value = false
    }

    return {
        loading,
        v$,
        handleSubmit,
        submitted
    }
}
