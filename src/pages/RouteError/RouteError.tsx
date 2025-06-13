import { useNavigate } from 'react-router-dom'
import { Button, pathBuilder } from '@common'

export const RouteError = () => {
    const navigate = useNavigate()
    return (
        <div className="App">
            <div className="AppContainer">
                <h1>Route Error</h1>
                <h2>404 - Page Not Found</h2>
                <p>Sorry, the page you are looking for does not exist.</p>
                <Button
                    label="Home"
                    onClick={() => navigate(pathBuilder('HOME'))}
                />
            </div>
        </div>
    )
}
