const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/kelas', component: Kelas },
    { path: '*', component: NotFound},
    { path: '/kelas/:id', component: detailKelas}
]

const router = new VueRouter({
    mode: 'history',
    routes // short for `routes: routes`
})

Vue.config.devtools = true
