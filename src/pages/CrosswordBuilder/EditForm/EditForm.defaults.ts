import type { CellType, Direction, EditFormData, EditFormState, FilterFn } from "./EditForm.types";
import type { Cell, CrosswordBoardResource, Option } from "@common";

export const defaultEditFromState: EditFormState = {
        isOpen: false,
        cell: undefined,
    }

export const defaultCellTypeOptions: Option<CellType>[] = [
    { value: 'empty', label: 'Empty' },
    { value: 'solution', label: 'Solution' },
    { value: 'clue', label: 'Clue' },
]

const filterTypeFn = ({ board, cell, option: {value} }: FilterFn<CellType>) => {
        const isUpperLeftCornerCell = cell.rowIndex === 0 && cell.colIndex === 0
        const isLowerRightCornerCell =
            cell.rowIndex === board.meta.dimensions.rowNumber - 1 &&
            cell.colIndex === board.meta.dimensions.colNumber - 1

        if (value !== 'empty' && isUpperLeftCornerCell) return false
        if (value !== 'solution' && isLowerRightCornerCell) return false
        return true
}

export const getCellTypeOptions = (board: CrosswordBoardResource, cell: Cell) => 
    defaultCellTypeOptions.filter(option => filterTypeFn({ board, cell, option }))


export const defaultClueDirectionOptions: Option<Direction>[] = [
    { value: 'horizontal', label: 'Horizontal' },
    { value: 'vertical', label: 'Vertical' },
    { value: 'multidirection', label: 'Multi Direction' },
]

const filterDirectionFn = ({ board, cell, option: {value} }: FilterFn<Direction>) => {
        const lastRow = board.meta.dimensions.rowNumber - 1
        const lastCol = board.meta.dimensions.colNumber - 1
        const isAtLastRow = cell.rowIndex === lastRow
        const isAtLastCol = cell.colIndex === lastCol

        if (value === 'horizontal' && isAtLastCol) return false
        if (value === 'vertical' && isAtLastRow) return false
        if (value === 'multidirection' && (isAtLastCol || isAtLastRow))
            return false
        return true
    }

export const getDirectionOptions = (board: CrosswordBoardResource, cell: Cell) => 
    defaultClueDirectionOptions.filter(option => filterDirectionFn({ board, cell, option }))

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

const getDefaultDirection = (cell?: Cell): Direction | undefined => {
    if (cell?.clueHorizontal && cell?.clueVertical) {
        return 'multidirection';
    } else if (cell?.clueHorizontal) {
        return 'horizontal';
    } else if (cell?.clueVertical) {
        return 'vertical';
    }    return undefined;
}

export const defaultEditFormData = (cell?: Cell): EditFormData => ({
    rowIndex: cell?.rowIndex || 0,
    colIndex: cell?.colIndex || 0,
    role: cell?.role || 'empty',
    solution: cell?.solution || '',
    direction: getDefaultDirection(cell),
    horizontalClueText: cell?.clueHorizontal?.text || '',
    verticalClueText: cell?.clueVertical?.text || '',
    imageUrl: cell?.clueHorizontal?.imageUrl || cell?.clueVertical?.imageUrl || '',
    horizontalTextPlacement: cell?.clueHorizontal?.textPlacement?.horizontal || 'center',
    verticalTextPlacement: cell?.clueVertical?.textPlacement?.vertical || 'center',
})