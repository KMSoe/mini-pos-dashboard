import { ref, reactive, watch } from 'vue'
import { useAuthStore } from '../store'
import { Errors } from '@/utils/serverValidation'
import { email, required } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import router from '@/router'

export const useLogin = () => {
    const loading = ref(false)
    const store = useAuthStore()
    const errors = reactive(new Errors())
    const submitted = ref(false)

    const state = reactive({
        email: '',
        password: ''
    })

    const rules = {
        email: { required, email },
        password: { required }
    }

    const v$ = useVuelidate(rules, state)

    const handleSubmit = (isFormValid) => {
        submitted.value = true

        if (!isFormValid) {
            return
        }

        loginUser()
    }

    const loginUser = async () => {
        loading.value = true

        try {
            await store.login({
                email: state.email.trim(),
                password: state.password
            })

            const response = store.getLoginResponse

            if (response) {
                const { accessToken, user } = response.data

                store.saveToLocalStorage(accessToken, user)

                router.push({ name: 'dashboard' })
            }

            submitted.value = false
        } catch (error) {
            loading.value = false
            const loginError = store.getLoginError

            if (loginError) {
                errors.recordMessage(loginError)
            }
        }

        loading.value = false
    }

    watch(
        () => state,
        () => {
            errors.clear()
        },
        { deep: true }
    )

    return {
        loading,
        errors,
        v$,
        handleSubmit,
        submitted
    }
}
