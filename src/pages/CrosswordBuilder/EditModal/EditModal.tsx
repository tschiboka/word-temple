import './EditModal.styles.scss'
import type { EditFormData, EditFormState } from '../EditForm/EditForm.types'
import type { Cell, CrosswordBoardResource } from '@common'
import { CellInfo } from '../CellInfo/CellInfo'
import { EditForm } from '../EditForm/EditForm'
import { transformEditFormData } from './EditModal.transformers'

type EditModalProps = {
    initialFormState: EditFormState
    board: CrosswordBoardResource
    setFormState: (formState: EditFormState) => void
    setBoard: (board: CrosswordBoardResource) => void
}

export const EditModal = ({
    initialFormState,
    board,
    setFormState,
    setBoard,
}: EditModalProps) => {
    const { isOpen, cell } = initialFormState

    const setClose = (updatedCell?: Cell) =>
        setFormState({
            isOpen: false,
            cell: updatedCell || cell,
        })

    const onSubmit = (data: EditFormData) => {
        const updatedCell = transformEditFormData.toApi(data)

        const newBoard = board.cells.map((row, rowIndex) =>
            row.map((cell, colIndex) => {
                if (rowIndex === data.rowIndex && colIndex === data.colIndex) {
                    return updatedCell
                }
                return cell
            }),
        )
        setBoard({ ...board, cells: newBoard })
        setClose(updatedCell)
    }

    return (
        isOpen &&
        cell && (
            <div className="EditModal">
                <h2>Edit Crossword Cell</h2>
                <CellInfo board={board} cell={cell} />
                <EditForm
                    cell={cell}
                    board={board}
                    onSubmit={onSubmit}
                    setClose={setClose}
                />
            </div>
        )
    )
}
