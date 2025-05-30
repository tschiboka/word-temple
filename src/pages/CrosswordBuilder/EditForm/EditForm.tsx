import { useForm } from 'react-hook-form'
import { Select } from '../../../common/components/Select/Select'
import { type EditFormData } from '../EditModal'
import { useEffect } from 'react'
import type { Cell, CrosswordBoardResource } from '../../../common/types'
import { Button } from '../../../common/components/Button/Button'
import {
    defatultEditFormData,
    defaultCellTypeOptions,
} from './EditForm.defaults'
import { match } from 'ts-pattern'
import { editFormSchema } from './EditForm.schemas'
import { yupResolver } from '@hookform/resolvers/yup'
import { CellPreview } from '../CellPreview/CellPreview'
import { ClueElements, SolutionElements } from './FormElements'

type EditFormProps = {
    cell: Cell
    board: CrosswordBoardResource
    onSubmit: (data: EditFormData) => void
    setClose: () => void
}
export const EditForm = ({
    cell,
    board,
    onSubmit,
    setClose,
}: EditFormProps) => {
    const { control, reset, handleSubmit, watch, getValues } = useForm({
        defaultValues: defatultEditFormData(),
        resolver: yupResolver(editFormSchema),
    })

    const { role, direction } = watch()

    useEffect(() => {
        if (cell) reset(defatultEditFormData(cell))
    }, [cell])

    const formElements = match({ role, direction })
        .with({ role: 'solution' }, () => SolutionElements(control))
        .with({ role: 'clue' }, () =>
            ClueElements(control, cell, board, direction),
        )
        .otherwise(() => <></>)

    const isUpperLeftCornerCell = cell.rowIndex === 0 && cell.colIndex === 0
    const cellTypeOptions = isUpperLeftCornerCell
        ? defaultCellTypeOptions.filter((option) => option.value === 'empty')
        : defaultCellTypeOptions

    return (
        <>
            <form>
                <div className="EditModalFormGroup">
                    <Select
                        name={'role'}
                        control={control}
                        label="Cell Type"
                        options={cellTypeOptions}
                    />
                </div>
                {formElements}
                <CellPreview board={board} formData={getValues()} />
            </form>
            <div className="EditModalActions">
                <Button label="Save" onClick={handleSubmit(onSubmit)} />
                <Button label="Cancel" onClick={setClose} />
            </div>
        </>
    )
}
