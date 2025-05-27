import type { Cell, CrosswordBoardResource } from "../../common/types";

const DEFAULT_ROW_NUMBER = 10;
const DEFAULT_COL_NUMBER = 8;

const getDefaultCells = (rowNumber: number, colNumber: number):Cell[][] => {
 return Array.from({ length: rowNumber }, (_, rowIndex) =>   
    Array.from({ length: colNumber }, (_, colIndex): Cell => ({
        rowIndex,
        colIndex,
        role: 'empty',
        })
    ))
}

export const  defaultBoard: CrosswordBoardResource = {
        meta: {
            createdBy: '12345', // TODO: use user ID from auth context
            title: '',
            description: '',
            dimensions: {  rowNumber: DEFAULT_ROW_NUMBER, colNumber: DEFAULT_COL_NUMBER, },
            difficulty: 3,
            isActive: true,
            tags: [],
            language: 'en',
        },
        cells: getDefaultCells(8, 10),
    }