import routesConfig from '~/config/routes'
import Login from '~/pages/Login'
import Register from '~/pages/Register'


const publicRoutes = [
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }