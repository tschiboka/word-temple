import { useForm } from 'react-hook-form'
import { Select, Button } from '@common'
import type { Cell, CrosswordBoardResource } from '@common'
import { type EditFormData } from '../EditModal'
import { useEffect } from 'react'
import { defaultEditFormData, getCellTypeOptions } from './EditForm.defaults'
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
        defaultValues: defaultEditFormData(),
        resolver: yupResolver(editFormSchema),
    })

    const { role, direction } = watch()

    useEffect(() => {
        if (cell) reset(defaultEditFormData(cell))
    }, [cell])

    const formElements = match({ role, direction })
        .with({ role: 'solution' }, () => SolutionElements(control))
        .with({ role: 'clue' }, () =>
            ClueElements(control, cell, board, direction),
        )
        .otherwise(() => <></>)

    return (
        <>
            <form>
                <div className="EditModalFormGroup">
                    <Select
                        name={'role'}
                        control={control}
                        label="Cell Type"
                        options={getCellTypeOptions(board, cell)}
                        ariaLabel="Select Cell Type"
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
