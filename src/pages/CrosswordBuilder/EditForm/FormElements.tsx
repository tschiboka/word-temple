import type { Control } from 'react-hook-form'
import { TextInput } from '../../../common/components/TextInput/TextInput'
import type { Direction, EditFormData } from '../EditModal'
import { Select } from '../../../common/components/Select/Select'
import {
    defaultClueDirectionOptions,
    defaultClueTextPlacementOptions,
} from './EditForm.defaults'
import type { Cell, CrosswordBoardResource } from '../../../common/types'

export const SolutionElements = (control: Control<EditFormData>) => (
    <div className="EditModalFormGroup">
        <TextInput
            name="solution"
            control={control}
            label="Solution"
            placeholder="Solution Character"
        />
    </div>
)

export const ClueElements = (
    control: Control<EditFormData>,
    cell: Cell,
    board: CrosswordBoardResource,
    direction?: Direction,
) => {
    const isCellOnLastRow =
        cell.rowIndex === board.meta.dimensions.rowNumber - 1
    const isCellOnLastColumn =
        cell.colIndex === board.meta.dimensions.colNumber - 1
    const canHaveMultidirection = !isCellOnLastColumn && !isCellOnLastRow
    const directionOptions = canHaveMultidirection
        ? defaultClueDirectionOptions
        : defaultClueDirectionOptions.filter(
              (option) => option.value !== 'multidirection',
          )

    return (
        <>
            <div className="EditModalFormGroup">
                <Select
                    name={'direction'}
                    control={control}
                    label="Direction"
                    options={directionOptions}
                />
            </div>
            {(direction === 'horizontal' || direction === 'multidirection') && (
                <div className="EditModalFormGroup">
                    <TextInput
                        name="horizontalClueText"
                        control={control}
                        label={
                            direction === 'multidirection'
                                ? 'Horizontal Clue'
                                : 'Clue Text'
                        }
                        placeholder="Clue Text"
                    />
                </div>
            )}
            {(direction === 'vertical' || direction === 'multidirection') && (
                <div className="EditModalFormGroup">
                    <TextInput
                        name="verticalClueText"
                        control={control}
                        label={
                            direction === 'multidirection'
                                ? 'Vertical Clue'
                                : 'Clue Text'
                        }
                        placeholder="Clue Text"
                    />
                </div>
            )}
            {direction !== 'multidirection' && (
                <>
                    <div className="EditModalFormGroup">
                        <Select
                            name={'horizontalTextPlacement'}
                            control={control}
                            label="Horizontal Placement"
                            options={defaultClueTextPlacementOptions.horizontal}
                        />
                    </div>
                    <div className="EditModalFormGroup">
                        <Select
                            name={'verticalTextPlacement'}
                            control={control}
                            label="Vertical Placement"
                            options={defaultClueTextPlacementOptions.vertical}
                        />
                    </div>
                    <div className="EditModalFormGroup">
                        <TextInput
                            name="imageUrl"
                            control={control}
                            label="Image URL"
                            placeholder="Image"
                        />
                    </div>
                </>
            )}
        </>
    )
}
