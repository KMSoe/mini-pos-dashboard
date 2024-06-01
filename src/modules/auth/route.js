const moduleRoutes = [
    {
        path: '/',
        children: [
            {
                path: '',
                name: 'login',
                component: () => import('@/modules/auth/list/Login.vue')
            }
        ]
    }
]

export default moduleRoutes
