import type { Control } from 'react-hook-form'
import { TextInput } from '../../../common/components/TextInput/TextInput'
import type { Direction, EditFormData } from '../EditModal'
import { Select } from '../../../common/components/Select/Select'
import {
    defaultClueTextPlacementOptions,
    getDirectionOptions,
} from './EditForm.defaults'
import type { Cell, CrosswordBoardResource } from '../../../common/types'

export const SolutionElements = (control: Control<EditFormData>) => (
    <div className="EditModalFormGroup">
        <TextInput
            name="solution"
            control={control}
            label="Solution"
            placeholder="Solution Character"
            style={{ textTransform: 'uppercase' }}
        />
    </div>
)

export const ClueElements = (
    control: Control<EditFormData>,
    cell: Cell,
    board: CrosswordBoardResource,
    direction?: Direction,
) => (
    <>
        <div className="EditModalFormGroup">
            <Select
                name={'direction'}
                control={control}
                label="Direction"
                options={getDirectionOptions(board, cell) || []}
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
                    style={{ textTransform: 'uppercase' }}
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
                    style={{ textTransform: 'uppercase' }}
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
