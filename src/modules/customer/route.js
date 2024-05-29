import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/customers',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'customer',
                component: () => import('@/modules/customer/list/Customer.vue')
            }
        ]
    }
]

export default moduleRoutes
