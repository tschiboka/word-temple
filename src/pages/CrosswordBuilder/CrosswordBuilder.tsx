import { Button, Board, defaultBoard, pathBuilder } from '@common'
import type { CrosswordBoardResource } from '@common'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { EditModal, type EditFormState } from './EditModal'
import './CrosswordBuilder.styles.scss'
import { defaultEditFromState } from './EditForm/EditForm.defaults'

export const CrosswordBuilder = () => {
    const navigate = useNavigate()

    const [board, setBoard] = useState<CrosswordBoardResource>(defaultBoard)
    const [editFormState, setEditFormState] =
        useState<EditFormState>(defaultEditFromState)

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
                        <Button label="Save" onClick={() => {}} />
                        <Button label="Load" onClick={() => {}} />
                        <Button label="Clear" onClick={() => {}} />
                    </div>
                    <div>
                        <Button
                            label="Home"
                            onClick={() => navigate(pathBuilder('HOME'))}
                        />{' '}
                        <Button label="Help" onClick={() => {}} />
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
