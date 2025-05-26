import { createHashRouter } from 'react-router-dom'
import App from '../../App'
import { CrosswordBuilder } from '../../pages/CrosswordBuilder/CrosswordBuilder'
import { RouteError } from '../components/RouteError/RouteError'

export const PATHS = {
    HOME: '/',
    BUILDER: '/builder',
}

export const routes = [
    {
        path: PATHS.HOME,
        element: <App />,
    },
    {
        path: PATHS.BUILDER,
        element: <CrosswordBuilder />,
    },
    {
        path: '/*',
        element: <RouteError />,
    },
]

const Router = createHashRouter(routes)
export default Router
