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

export const defaultClueTextPlacementOptions = {
    horizontal: [
        { value: 'center', label: 'Center' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' },
    ],
    vertical: [
        { value: 'center', label: 'Center' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
    ]
}


export const defatultEditFormData = (cell?: Cell): EditFormData => ({
    rowIndex: cell?.rowIndex || 0,
    colIndex: cell?.colIndex || 0,
    role: cell?.role || 'empty',
    solution: cell?.solution || '',
    direction: cell?.clueHorizontal ? 'horizontal' : cell?.clueVertical ? 'vertical' : undefined,
    horizontalClueText: cell?.clueHorizontal?.text || '',
    verticalClueText: cell?.clueVertical?.text || '',
    imageUrl: cell?.clueHorizontal?.imageUrl || cell?.clueVertical?.imageUrl || '',
    horizontalTextPlacement: cell?.clueHorizontal?.textPlacement?.horizontal || 'center',
    verticalTextPlacement: cell?.clueVertical?.textPlacement?.vertical || 'center',
})