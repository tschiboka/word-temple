import { CrosswordBoardResource } from "@common";

export const directionFnTestBoard = {
    meta: {
        dimensions: {
            rowNumber: 5,
            colNumber: 5,
        },
    },
} as CrosswordBoardResource

export const defaultEditFormDataFnCell = {
    rowIndex: 0,
    colIndex: 0,
    role: 'empty',
    solution: '',
    direction: undefined,
    horizontalClueText: '',
    verticalClueText: '',
    imageUrl: '',
    horizontalTextPlacement: 'center',
    verticalTextPlacement: 'center',
}