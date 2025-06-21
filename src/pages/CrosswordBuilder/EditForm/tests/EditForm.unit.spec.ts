import { describe, it, expect } from 'vitest'
import { getDirectionOptions, getCellTypeOptions, defaultEditFormData } from '../EditForm.defaults'
import type { Cell } from '@common'
import { defaultEditFormDataFnCell, directionFnTestBoard } from './EditForm.mocks'

describe('getDirectionOptions', () => {
    it('should return all direction options for a middle cell', () => {
        const cell: Cell = {
            rowIndex: 2,
            colIndex: 2,
            role: 'empty',
        }

        const result = getDirectionOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(3)
        expect(result[0]).toEqual({ value: 'horizontal', label: 'Horizontal' })
        expect(result[1]).toEqual({ value: 'vertical', label: 'Vertical' })
        expect(result[2]).toEqual({ value: 'multidirection', label: 'Multi Direction' })
    })

    it('should exclude horizontal and multidirection options for last column cells', () => {
        const cell: Cell = {
            rowIndex: 2,
            colIndex: 4, // Last column (index 4 in 5x5 board)
            role: 'empty',
        }

        const result = getDirectionOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ value: 'vertical', label: 'Vertical' })
    })

    it('should exclude vertical and multidirection options for last row cells', () => {
        const cell: Cell = {
            rowIndex: 4, // Last row (index 4 in 5x5 board)
            colIndex: 2,
            role: 'empty',
        }

        const result = getDirectionOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ value: 'horizontal', label: 'Horizontal' })
    })
})

describe('getCellTypeOptions', () => {
    it('should return all cell type options for a middle cell', () => {
        const cell: Cell = {
            rowIndex: 2,
            colIndex: 2,
            role: 'empty',
        }

        const result = getCellTypeOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(3)
        expect(result[0]).toEqual({ value: 'empty', label: 'Empty' })
        expect(result[1]).toEqual({ value: 'solution', label: 'Solution' })
        expect(result[2]).toEqual({ value: 'clue', label: 'Clue' })
    })

    it('should only allow empty type for upper left corner cell', () => {
        const cell: Cell = {
            rowIndex: 0,
            colIndex: 0,
            role: 'empty',
        }

        const result = getCellTypeOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ value: 'empty', label: 'Empty' })
    })

    it('should only allow solution type for lower right corner cell', () => {
        const cell: Cell = {
            rowIndex: 4, // Last row (index 4 in 5x5 board)
            colIndex: 4, // Last column (index 4 in 5x5 board)
            role: 'empty',
        }

        const result = getCellTypeOptions(directionFnTestBoard, cell)

        expect(result).toHaveLength(1)
        expect(result[0]).toEqual({ value: 'solution', label: 'Solution' })
    })
})

describe('defaultEditFormData', () => {
    it('should return default form data when no cell is provided', () => {
        const result = defaultEditFormData()
        expect(result).toEqual(defaultEditFormDataFnCell)
    })

    it('should return form data based on empty cell', () => {
        const cell: Cell = {
            ...defaultEditFormDataFnCell,
            rowIndex: 2,
            colIndex: 3,
            role: 'empty',
        }

        const result = defaultEditFormData(cell)

        expect(result).toEqual({
            rowIndex: 2,
            colIndex: 3,
            role: 'empty',
            solution: '',
            direction: undefined,
            horizontalClueText: '',
            verticalClueText: '',
            imageUrl: '',
            horizontalTextPlacement: 'center',
            verticalTextPlacement: 'center',        })
    })

    it('should return form data based on solution cell', () => {
        const cell: Cell = {
            rowIndex: 1,
            colIndex: 2,
            role: 'solution',
            solution: 'A',
        }

        const result = defaultEditFormData(cell)

        expect(result).toEqual({
            ...defaultEditFormDataFnCell,
            rowIndex: 1,
            colIndex: 2,
            role: 'solution',
            solution: 'A',
        })
    })    
    
    it('should return form data based on horizontal clue cell', () => {
        const cell: Cell = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            clueHorizontal: {
                text: 'HORIZONTAL CLUE',
                imageUrl: 'http://example.com/image.jpg',
                textPlacement: {
                    horizontal: 'left',
                    vertical: 'top',
                },
            },
        }

        const result = defaultEditFormData(cell)

        expect(result).toEqual({
            ...defaultEditFormDataFnCell,
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'HORIZONTAL CLUE',
            imageUrl: 'http://example.com/image.jpg',
            horizontalTextPlacement: 'left',
        })
    })  
    
    it('should return form data based on vertical clue cell', () => {
        const cell: Cell = {
            rowIndex: 2,
            colIndex: 1,
            role: 'clue',
            clueVertical: {
                text: 'VERTICAL CLUE',
                imageUrl: 'http://example.com/vertical.jpg',
                textPlacement: {
                    horizontal: 'right',
                    vertical: 'bottom',
                },
            },
        }

        const result = defaultEditFormData(cell)

        expect(result).toEqual({
            ...defaultEditFormDataFnCell,
            rowIndex: 2,
            colIndex: 1,
            role: 'clue',
            direction: 'vertical',
            verticalClueText: 'VERTICAL CLUE',
            imageUrl: 'http://example.com/vertical.jpg',
            verticalTextPlacement: 'bottom',
        })
    })    
    
    it('should return form data based on multidirection clue cell', () => {
        const cell: Cell = {
            rowIndex: 3,
            colIndex: 2,
            role: 'clue',
            clueHorizontal: {
                text: 'HORIZONTAL TEXT',
                imageUrl: 'http://example.com/horizontal.jpg',
                textPlacement: {
                    horizontal: 'left',
                    vertical: 'center',
                },
            },
            clueVertical: {
                text: 'VERTICAL TEXT',
                imageUrl: 'http://example.com/vertical.jpg',
                textPlacement: {
                    horizontal: 'center',
                    vertical: 'bottom',
                },
            },
        }

        const result = defaultEditFormData(cell)

        expect(result).toEqual({
            ...defaultEditFormDataFnCell,
            rowIndex: 3,
            colIndex: 2,
            role: 'clue',
            direction: 'multidirection',
            horizontalClueText: 'HORIZONTAL TEXT',
            verticalClueText: 'VERTICAL TEXT',
            imageUrl: 'http://example.com/horizontal.jpg', // Uses horizontal imageUrl when both exist
            horizontalTextPlacement: 'left',
            verticalTextPlacement: 'bottom',
        })
    })
})