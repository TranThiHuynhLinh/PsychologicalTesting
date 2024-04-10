import routesConfig from '~/config/routes'
import Login from '~/pages/Login'
import Register from '~/pages/Register'
import GetInfo from '~/pages/GetInfo'
import Measure from '~/pages/Measure'

const publicRoutes = [
    { path: routesConfig.login, component: Login },
    { path: routesConfig.register, component: Register },
    { path: routesConfig.getInfo, component: GetInfo },
    { path: routesConfig.measure, component: Measure },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }