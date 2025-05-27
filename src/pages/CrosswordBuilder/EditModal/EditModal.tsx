import { Button } from '../../../common/components/Button/Button'
import { Select } from '../../../common/components/Select/Select'
import {
    defaultCellTypeOptions,
    defaultClueDirectionOptions,
    defaultClueTextPlacementOptions,
} from './EditModal.defaults'
import './EditModal.styles.scss'
import type { EditFormState } from './EditModal.types'

type EditModalProps = {
    initialFormState: EditFormState
    setFormState: (formState: EditFormState) => void
}

export const EditModal = ({
    initialFormState,
    setFormState,
}: EditModalProps) => {
    const { isOpen, cell } = initialFormState

    const setClose = () =>
        setFormState({
            isOpen: false,
            cell: undefined,
        })

    return (
        isOpen &&
        cell && (
            <div className="EditModal">
                <h2>Edit Crossword Cell</h2>
                <div className="CellInfo">
                    <div className="EditModalInfoPair">
                        <div>
                            Row index:{' '}
                            <span className="highlight">{cell.rowIndex}</span>
                        </div>
                        <div>
                            Col index:{' '}
                            <span className="highlight">{cell.colIndex}</span>
                        </div>
                    </div>
                    <div className="EditModalInfoPair">
                        <div>
                            Space across: <span className="highlight">-</span>
                        </div>
                        <div>
                            Space down: <span className="highlight">-</span>
                        </div>
                    </div>
                </div>
                <form>
                    <div className="EditModalFormGroup">
                        <label htmlFor="type">Cell Type</label>
                        <Select options={defaultCellTypeOptions} />
                    </div>
                    <div className="EditModalFormGroup">
                        <label htmlFor="solution">Solution</label>
                        <input
                            type="text"
                            name="solution"
                            placeholder="Solution Character"
                        />
                    </div>
                    <div className="EditModalFormGroup">
                        <label htmlFor="direction">Direction</label>
                        <Select options={defaultClueDirectionOptions} />
                    </div>
                    <div className="EditModalFormGroup">
                        <label htmlFor="clue">Clue</label>
                        <input
                            type="text"
                            name="clue"
                            placeholder="Clue Text"
                        />
                    </div>
                    <div className="EditModalFormGroup">
                        <label htmlFor="image">Image</label>
                        <input type="text" name="image" placeholder="Image" />
                    </div>
                    <div className="EditModalFormGroup">
                        <label htmlFor="placement">Placement</label>
                        <Select options={defaultClueTextPlacementOptions} />
                    </div>
                </form>
                <div className="EditModalActions">
                    <Button label="Save" onClick={setClose} />
                    <Button label="Cancel" onClick={setClose} />
                </div>
            </div>
        )
    )
}
