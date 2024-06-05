const moduleRoutes = [
    {
        path: '/',
        children: [
            {
                path: 'login',
                name: 'login',
                component: () => import('@/modules/auth/list/Login.vue'),
                meta: { redirectIfLoggedIn: true, title: 'Login' }
            }
        ]
    }
]

export default moduleRoutes
