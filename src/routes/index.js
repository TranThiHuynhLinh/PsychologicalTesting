import routesConfig from '~/config/routes'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import GetInfo from '~/pages/GetInfo'


const publicRoutes = [
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register },
    { path: routesConfig.getInfo, component: GetInfo }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }