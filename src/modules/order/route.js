import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/orders',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'order',
                component: () => import('@/modules/order/list/Order.vue'),
                meta: { auth: true }
            },
            {
                path: 'add-order',
                name: 'add-order',
                component: () => import('@/modules/order/entry/New.vue'),
                meta: { auth: true }
            }
        ]
    }
]

export default moduleRoutes
