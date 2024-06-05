import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/modules/dashboard/list/Dashboard.vue'),
                meta: { auth: true }
            }
        ]
    }
]

export default moduleRoutes
