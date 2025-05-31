import { Button } from '../../common/components/Button/Button'
import { Board, defaultBoard } from '../../common/components/Board'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryParams } from '../../common/utils/useQueryParams'
import { pathBuilder } from '../../common/routing/pathBuilder'
import type { CrosswordBoardResource } from '../../common/types'
import { EditModal, type EditFormState } from './EditModal'
import './CrosswordBuilder.styles.scss'
import { defaultEditFromState } from './EditForm/EditForm.defaults'

export const CrosswordBuilder = () => {
    const navigate = useNavigate()
    const { id } = useQueryParams()

    const [board, setBoard] = useState<CrosswordBoardResource>(defaultBoard)
    const [editFormState, setEditFormState] =
        useState<EditFormState>(defaultEditFromState)

    useEffect(() => {
        if (id) {
            console.log('Loading board with ID:', id)
        }
    }, [id])

    const editCell = (
        cell: CrosswordBoardResource['cells'][number][number],
    ) => {
        setEditFormState({ isOpen: true, cell })
    }

    return (
        <div className="CrosswordBuilder">
            <div className="CrosswordBuilderContainer">
                <h1>Crossword Builder</h1>
                <Board mode="edit" crossword={board} onClick={editCell} />
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
                <EditModal
                    initialFormState={editFormState}
                    board={board}
                    setFormState={setEditFormState}
                    setBoard={setBoard}
                />
            </div>
        </div>
    )
}
