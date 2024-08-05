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
                path: 'create',
                name: 'customer-create',
                component: () => import('@/modules/customer/entry/New.vue'),
                meta: { auth: true }
            },
            {
                path: ':id/edit',
                name: 'customer-edit',
                component: () => import('@/modules/customer/edit/Edit.vue'),
                meta: { auth: true }
            }
        ]
    }
]

export default moduleRoutes
