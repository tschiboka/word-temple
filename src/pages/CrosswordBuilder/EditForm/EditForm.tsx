import { useForm } from 'react-hook-form'
import { Select } from '../../../common/components/Select/Select'
import { TextInput } from '../../../common/components/TextInput/TextInput'
import { type Direction, type EditFormData } from '../EditModal'
import { useEffect } from 'react'
import type { Cell } from '../../../common/types'
import { Button } from '../../../common/components/Button/Button'
import {
    defatultEditFormData,
    defaultCellTypeOptions,
    defaultClueDirectionOptions,
    defaultClueTextPlacementOptions,
} from './EditForm.defaults'
import { match } from 'ts-pattern'

type EditFormProps = {
    cell: Cell
    onSubmit: (data: EditFormData) => void
    setClose: () => void
}
export const EditForm = ({ cell, onSubmit, setClose }: EditFormProps) => {
    const { control, reset, handleSubmit, watch } = useForm({
        defaultValues: defatultEditFormData(),
    })

    const { role, direction } = watch()

    useEffect(() => {
        if (cell) reset(defatultEditFormData(cell))
    }, [cell])

    const SolutionElements = (
        <div className="EditModalFormGroup">
            <TextInput
                name="solution"
                control={control}
                label="Solution"
                placeholder="Solution Character"
            />
        </div>
    )

    const ClueElements = (direction?: Direction) => (
        <>
            <div className="EditModalFormGroup">
                <Select
                    name={'direction'}
                    control={control}
                    label="Direction"
                    options={defaultClueDirectionOptions}
                />
            </div>
            {(direction === 'horizontal' || direction === 'multidirection') && (
                <div className="EditModalFormGroup">
                    <TextInput
                        name="horizontalClueText"
                        control={control}
                        label="Horisontal Clue"
                        placeholder="Clue Text"
                    />
                </div>
            )}
            {(direction === 'vertical' || direction === 'multidirection') && (
                <div className="EditModalFormGroup">
                    <TextInput
                        name="verticalClueText"
                        control={control}
                        label="Vertical Clue"
                        placeholder="Clue Text"
                    />
                </div>
            )}
            {direction !== 'multidirection' && (
                <>
                    <div className="EditModalFormGroup">
                        <TextInput
                            name="imageUrl"
                            control={control}
                            label="Image URL"
                            placeholder="Image"
                        />
                    </div>
                    <div className="EditModalFormGroup">
                        <Select
                            name={'textPlacement'}
                            control={control}
                            label="Placement"
                            options={defaultClueTextPlacementOptions}
                        />
                    </div>
                </>
            )}
        </>
    )

    const formElements = match({ role, direction })
        .with({ role: 'solution' }, () => SolutionElements)
        .with({ role: 'clue' }, () => ClueElements(direction))
        .otherwise(() => <></>)

    return (
        <>
            <form>
                <div className="EditModalFormGroup">
                    <Select
                        name={'role'}
                        control={control}
                        label="Cell Type"
                        options={defaultCellTypeOptions}
                    />
                </div>
                {formElements}
            </form>
            <div className="EditModalActions">
                <Button label="Save" onClick={handleSubmit(onSubmit)} />
                <Button label="Cancel" onClick={setClose} />
            </div>
        </>
    )
}
