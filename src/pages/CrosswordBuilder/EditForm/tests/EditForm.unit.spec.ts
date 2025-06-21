import { describe, it, expect } from 'vitest'
import { getDirectionOptions, getCellTypeOptions } from '../EditForm.defaults'
import type { Cell } from '@common'
import { directionFnTestBoard } from './EditForm.mocks'

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