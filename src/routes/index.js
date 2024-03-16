import routesConfig from '~/config/routes'
import Login from '~/pages/Login'


const publicRoutes = [
    { path: routesConfig.login, component: Login }
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }