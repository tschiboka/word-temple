import './App.scss'
import { Button } from './common/components/Button/Button'

function App() {
    return (
        <div className="App">
            <div className="AppContainer">
                <Button
                    label="Crossword Builder"
                    onClick={() => console.log('Clicked')}
                />
            </div>
        </div>
    )
}

export default App
