import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/dashboard',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/modules/dashboard/list/Dashboard.vue')
            }
        ]
    }
]

export default moduleRoutes
