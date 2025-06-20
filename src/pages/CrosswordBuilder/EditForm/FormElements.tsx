import type { Control } from 'react-hook-form'
import { TextInput, Select } from '@common'
import type { Cell, CrosswordBoardResource } from '@common'
import type { Direction, EditFormData } from '../EditModal'
import {
    defaultClueTextPlacementOptions,
    getDirectionOptions,
} from './EditForm.defaults'

export const SolutionElements = (control: Control<EditFormData>) => (
    <div className="EditModalFormGroup">
        <TextInput
            name="solution"
            control={control}
            label="Solution"
            placeholder="Solution Character"
            ariaLabel="Solution Input"
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
                ariaLabel="Select Direction"
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
                    ariaLabel="Horizontal Clue Input"
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
                    ariaLabel="Vertical Clue Input"
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
                        ariaLabel="Select Horizontal Text Placement"
                    />
                </div>
                <div className="EditModalFormGroup">
                    <Select
                        name={'verticalTextPlacement'}
                        control={control}
                        label="Vertical Placement"
                        options={defaultClueTextPlacementOptions.vertical}
                        ariaLabel="Select Vertical Text Placement"
                    />
                </div>
                <div className="EditModalFormGroup">
                    <TextInput
                        name="imageUrl"
                        control={control}
                        label="Image URL"
                        placeholder="Image"
                        ariaLabel="Image URL Input"
                    />
                </div>
            </>
        )}
    </>
)
