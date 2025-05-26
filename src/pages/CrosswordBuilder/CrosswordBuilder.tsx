import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/components/Button/Button'
import './CrosswordBuilder.scss'
import { Editor } from './Editor/Editor'
import { pathBuilder } from '../../common/routing/pathBuilder'

export const CrosswordBuilder = () => {
    const navigate = useNavigate()
    return (
        <div className="CrosswordBuilder">
            <div className="CrosswordBuilderContainer">
                <h1>Crossword Builder</h1>
                <Editor />
                <footer>
                    <div>
                        <Button
                            label="Save"
                            onClick={() => console.log('Not implemented')}
                        />
                        <Button
                            label="Load"
                            onClick={() => console.log('Not implemented')}
                        />
                        <Button
                            label="Clear"
                            onClick={() => console.log('Not implemented')}
                        />
                    </div>
                    <div>
                        <Button
                            label="Home"
                            onClick={() => navigate(pathBuilder('HOME'))}
                        />
                        <Button
                            label="Help"
                            onClick={() => console.log('Not implemented')}
                        />
                    </div>
                </footer>
            </div>
        </div>
    )
}
