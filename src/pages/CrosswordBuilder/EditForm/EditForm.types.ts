import type { Cell, HorizontalPlacements, VerticalPlacements } from "../../../common/types"


export type EditFormState = {
    isOpen: boolean
    cell?: Cell
}

export type EditFormData = {
    rowIndex: number,
    colIndex: number,
    role: CellType,
    solution?: string,
    direction?: Direction,
    horizontalClueText?: string,
    verticalClueText?: string,
    imageUrl?: string,
    horizontalTextPlacement?: HorizontalPlacements,
    verticalTextPlacement?: VerticalPlacements,
}

export type Direction = 'horizontal' | 'vertical' | 'multidirection'
export type CellType = 'empty' | 'solution' | 'clue'