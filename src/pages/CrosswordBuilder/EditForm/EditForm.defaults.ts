import type { Direction, EditFormData, EditFormState } from "../EditModal";
import type { Cell } from "../../../common/types";

export const defaultEditFromState: EditFormState = {
        isOpen: false,
        cell: undefined,
    }

export const defaultCellTypeOptions = [
    { value: 'empty', label: 'Empty' },
    { value: 'solution', label: 'Solution' },
    { value: 'clue', label: 'Clue' },
]

export const defaultClueDirectionOptions: {value: Direction, label: string}[] = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'multidirection', label: 'Multi Direction' },
]

export const defaultClueTextPlacementOptions = [
    { value: 'center', label: 'Center' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
]


export const defatultEditFormData = (cell?: Cell): EditFormData => ({
    rowIndex: cell?.rowIndex || 0,
    colIndex: cell?.colIndex || 0,
    role: cell?.role || 'empty',
    solution: cell?.solution || '',
    direction: cell?.clueAcross ? 'horizontal' : cell?.clueDown ? 'vertical' : undefined,
    horizontalClueText: cell?.clueAcross?.text || '',
    verticalClueText: cell?.clueDown?.text || '',
    imageUrl: cell?.clueAcross?.imageUrl || cell?.clueDown?.imageUrl || '',
    textPlacement: cell?.clueAcross?.textPlacement || cell?.clueDown?.textPlacement || 'center',
})