import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import App from './App.vue'
import router from './router'
import 'primeflex/primeflex.css'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.use(PrimeVue, {
    ripple: false,
    inputStyle: 'outlined',
    pt: {
        progressbar: {
            value: {
                style: {
                    'background-color': '#4338CA'
                }
            }
        }
    }
})

app.mount('#app')
