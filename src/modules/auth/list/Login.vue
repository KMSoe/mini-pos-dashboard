<template>
    <div class="flex align-items-center justify-content-center min-h-screen">
        <Card class="p-card p-component" style="width: 400px;">
            <template #content>
                <form @submit.prevent="handleSubmit(!v$.$invalid)" class="fadeinout animation-duration-500">
                    <div class="w-full mx-auto">
                        <!-- Email -->
                        <div class="p-field">
                            <label for="email" class="block text-900 text-xl font-medium mb-2"
                                :class="{ 'p-error': v$.email.$invalid && submitted }">Email</label>
                            <InputText id="email" v-model="v$.email.$model"
                                :class="{ 'p-invalid': (v$.email.$invalid && submitted) || errors.hasMessage('message') }"
                                type="text" class="w-full" placeholder="Email" style="padding: 1rem" />
                            <span v-if="(v$.email.$invalid && submitted) || v$.email.$pending.$response"
                                class="p-error">
                                <small>{{ v$.email.required.$message.replace('Value', 'Email') }}</small>
                            </span>
                        </div>

                        <!-- Password -->
                        <div class="p-field mt-3">
                            <label for="password" class="block text-900 font-medium text-xl mb-2"
                                :class="{ 'p-error': v$.password.$invalid && submitted }">Password</label>
                            <Password id="password" v-model="v$.password.$model" placeholder="Password" class="w-full"
                                input-class="w-full" input-style="padding:1rem"
                                :class="{ 'p-invalid': (v$.password.$invalid && submitted) || errors.hasMessage('message') }"
                                :feedback="false" :toggleMask="true" showIcon="pi pi-eye-slash" hideIcon="pi pi-eye" />
                            <span v-if="(v$.password.$invalid && submitted) || v$.password.$pending.$response"
                                class="p-error">
                                <small>{{ v$.password.required.$message.replace('Value', 'Password') }}</small>
                            </span>
                            <!-- Server Validation -->
                            <span v-if="errors.hasMessage" class="p-error">
                                <small>{{ errors.getMessage() }}</small>
                            </span>
                        </div>

                        <Button type="submit" label="Sign In" class="w-full p-3 text-xl mt-5" />
                    </div>
                </form>
            </template>
        </Card>
        <Loading v-if="loading" />
    </div>
</template>

<script setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import Card from 'primevue/card'
import { useLogin } from './useLogin'
import Loading from '@/components/Loading.vue'

const { loading, errors, v$, handleSubmit, submitted } = useLogin()
</script>

<style scoped>
.min-h-screen {
    min-height: 100vh;
}

.p-card {
    width: 100%;
    max-width: 400px;
}

.p-error {
    color: #ff4d4f;
}

.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>