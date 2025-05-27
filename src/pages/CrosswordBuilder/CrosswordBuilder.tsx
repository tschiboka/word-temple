import { useNavigate } from 'react-router-dom'
import { Button } from '../../common/components/Button/Button'
import { defaultBoard } from '.'
import './CrosswordBuilder.scss'
import { Editor } from './Editor/Editor'
import { pathBuilder } from '../../common/routing/pathBuilder'
import { useQueryParams } from '../../common/utils/useQueryParams'
import type { CrosswordBoardResource } from '../../common/types'
import { useEffect, useState } from 'react'

export const CrosswordBuilder = () => {
    const navigate = useNavigate()
    const { id } = useQueryParams()

    const [board, setBoard] = useState<CrosswordBoardResource | undefined>(
        defaultBoard,
    )

    useEffect(() => {
        if (id) {
            console.log('Loading board with ID:', id)
        }
    }, [id])

    return (
        <div className="CrosswordBuilder">
            <div className="CrosswordBuilderContainer">
                <h1>Crossword Builder</h1>
                <Editor crossword={board} />
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
