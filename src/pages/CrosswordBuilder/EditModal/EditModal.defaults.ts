import type { EditFormState } from ".";

export const defaultEditFromState: EditFormState = {
        isOpen: false,
        cell: undefined,
    }

export const defaultCellTypeOptions = [
    { value: 'empty', label: 'Empty' },
    { value: 'solution', label: 'Solution' },
    { value: 'clue', label: 'Clue' },
]

export const defaultClueDirectionOptions = [
    { value: 'across', label: 'Across' },
    { value: 'down', label: 'Down' },
]

export const defaultClueTextPlacementOptions = [
    { value: 'center', label: 'Center' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
]