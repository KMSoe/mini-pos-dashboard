import { createRouter, createWebHistory } from 'vue-router'
import AppLayout from '@/layouts/AppLayout.vue'
import EventBus from '@/libs/AppEventBus'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '',
                    name: 'dashboard',
                    component: () => import('@/modules/dashboard/Dashboard.vue')
                },
                {
                    path: 'customer',
                    name: 'customer',
                    component: () => import('@/modules/customer/list/Customer.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'NotFound',
            component: () => import('@/pages/NotFound.vue')
        }
    ]
})

router.beforeEach((to, from, next) => {
    EventBus.emit('progress', true)
    window.scrollTo(0, 0)

    return next()
})

// Set progress to false when the route has finished loading
router.afterEach(() => {
    EventBus.emit('progress', false)
})

export default router
