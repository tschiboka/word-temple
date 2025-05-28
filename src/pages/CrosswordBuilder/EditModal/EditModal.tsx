import './EditModal.styles.scss'
import type { EditFormData, EditFormState } from './EditModal.types'
import type { CrosswordBoardResource } from '../../../common/types'
import { CellInfo } from '../CellInfo/CellInfo'
import { EditForm } from '../EditForm/EditForm'

type EditModalProps = {
    initialFormState: EditFormState
    board: CrosswordBoardResource
    setFormState: (formState: EditFormState) => void
}

export const EditModal = ({
    initialFormState,
    board,
    setFormState,
}: EditModalProps) => {
    const { isOpen, cell } = initialFormState

    const setClose = () =>
        setFormState({
            isOpen: false,
            cell,
        })

    const onSubmit = (data: EditFormData) => {
        console.log('Form submitted with data:', data)
    }

    return (
        isOpen &&
        cell && (
            <div className="EditModal">
                <h2>Edit Crossword Cell</h2>
                <CellInfo board={board} cell={cell} />
                <EditForm cell={cell} onSubmit={onSubmit} setClose={setClose} />
            </div>
        )
    )
}
