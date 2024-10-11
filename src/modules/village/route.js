import AppLayout from '@/layouts/AppLayout.vue'

const moduleRoutes = [
    {
        path: '/villages',
        component: AppLayout,
        children: [
            {
                path: '',
                name: 'village',
                component: () => import('@/modules/village/list/Village.vue'),
                meta: { auth: true }
            },
            {
                path: 'create',
                name: 'village-create',
                component: () => import('@/modules/village/entry/New.vue'),
                meta: { auth: true }
            },
            {
                path: ':id/edit',
                name: 'village-edit',
                component: () => import('@/modules/village/edit/Edit.vue'),
                meta: { auth: true }
            }
        ]
    }
]

export default moduleRoutes
