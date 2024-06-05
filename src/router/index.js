import { createRouter, createWebHistory } from 'vue-router'
import EventBus from '@/libs/AppEventBus'

// Routes
import authRoutes from '@/modules/auth/route'
import dashboardRoutes from '@/modules/dashboard/route'
import customerRoutes from '@/modules/customer/route'

const routes = [
    ...authRoutes,
    ...dashboardRoutes,
    ...customerRoutes,
    {
        path: '/badpage',
        name: 'error404',
        component: () => import('@/pages/NotFound.vue')
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: () => import('@/pages/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    EventBus.emit('progress', true)
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0)

    // eslint-disable-next-line no-undef
    const isLoggedIn = localStorage.getItem('accessToken') ? true : false

    if (to.meta.auth && !isLoggedIn) {
        return next({ name: 'login' })
    }

    if (to.meta.redirectIfLoggedIn && isLoggedIn) {
        return next({ name: 'dashboard' })
    }

    return next()
})

// Set progress to false when the route has finished loading
router.afterEach(() => {
    EventBus.emit('progress', false)
})

export default router
