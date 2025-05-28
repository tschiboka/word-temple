import type { Cell } from "../../../common/types"


export type EditFormState = {
    isOpen: boolean
    cell?: Cell
}

export type EditFormData = {
    rowIndex: number,
    colIndex: number,
    role: 'empty' | 'solution' | 'clue',
    solution?: string,
    direction?: Direction,
    horizontalClueText?: string,
    verticalClueText?: string,
    imageUrl?: string,
    textPlacement?: 'center' | 'left' | 'right' | 'top' | 'bottom',
}

export type Direction = 'horizontal' | 'vertical' | 'multidirection'