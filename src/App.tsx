import { useNavigate } from 'react-router-dom'
import { Button } from './common/components/Button/Button'
import { pathBuilder } from './common/routing/pathBuilder'
import './App.scss'

function App() {
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
