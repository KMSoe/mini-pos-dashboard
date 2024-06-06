import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/customers',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'customer',
                component: () => import('@/modules/customer/list/Customer.vue'),
                meta: { auth: true }
            },
            {
                path: 'add-customer',
                name: 'add-customer',
                component: () => import('@/modules/customer/entry/New.vue'),
                meta: { auth: true }
            }
        ]
    }
]

export default moduleRoutes
