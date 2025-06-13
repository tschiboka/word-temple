import { useNavigate } from 'react-router-dom'
import { Button, pathBuilder } from '@common'
import './App.scss'

const App = () => {
    const navigate = useNavigate()
    return (
        <div className="App">
            <div className="AppContainer">
                <Button
                    label="Crossword Builder"
                    onClick={() =>
                        navigate(pathBuilder('BUILDER', { id: 123 }))
                    }
                />
            </div>
        </div>
    )
}

export default App
