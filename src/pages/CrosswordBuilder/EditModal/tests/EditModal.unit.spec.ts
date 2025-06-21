import { describe, it, expect } from 'vitest'
import { getAvailableSpace } from '../EditModal.utils'
import type { CrosswordBoardResource, Cell } from '@common'
import { EditFormData, transformEditFormData } from '..'

describe('getAvailableSpace', () => {
    // Helper function to create a test board with specific cells
    const createTestBoard = (
        rowNumber: number,
        colNumber: number,
        customCells?: Partial<Cell>[]
    ): CrosswordBoardResource => {
        const cells: Cell[][] = Array.from({ length: rowNumber }, (_, rowIndex) =>
            Array.from({ length: colNumber }, (_, colIndex): Cell => ({
                rowIndex,
                colIndex,
                role: 'empty',
            }))
        )

        // Apply custom cells if provided
        customCells?.forEach(cellOverride => {
            if (cellOverride.rowIndex !== undefined && cellOverride.colIndex !== undefined) {
                cells[cellOverride.rowIndex][cellOverride.colIndex] = {
                    ...cells[cellOverride.rowIndex][cellOverride.colIndex],
                    ...cellOverride,
                }
            }
        })

        return {
            meta: {
                createdBy: 'test',
                title: 'Test Board',
                description: 'Test board for getAvailableSpace tests',
                dimensions: { rowNumber, colNumber },
                difficulty: 1,
                isActive: true,
                tags: [],
                language: 'en',
            },
            cells,
        }
    }

    describe('Basic functionality', () => {
        it('should calculate available space correctly for top-left corner', () => {
            const board = createTestBoard(3, 3)
            const result = getAvailableSpace(board, 0, 0)

            expect(result).toEqual({
                across: 2, // 3 cells total - 1 (current cell) = 2
                down: 2,   // 3 cells total - 1 (current cell) = 2
            })
        })

        it('should calculate available space correctly for center position', () => {
            const board = createTestBoard(5, 5)
            const result = getAvailableSpace(board, 2, 2)

            expect(result).toEqual({
                across: 2, // From position 2 to end (positions 2, 3, 4) - 1 = 2
                down: 2,   // From position 2 to end (positions 2, 3, 4) - 1 = 2
            })
        })

        it('should calculate available space correctly for bottom-right corner', () => {
            const board = createTestBoard(4, 4)
            const result = getAvailableSpace(board, 3, 3)

            expect(result).toEqual({
                across: 0, // Only current cell remaining - 1 = 0
                down: 0,   // Only current cell remaining - 1 = 0
            })
        })

        it('should calculate available space correctly for last row', () => {
            const board = createTestBoard(3, 5)
            const result = getAvailableSpace(board, 2, 1)

            expect(result).toEqual({
                across: 3, // From position 1 to end (positions 1, 2, 3, 4) - 1 = 3
                down: 0,   // Only current cell in last row - 1 = 0
            })
        })

        it('should calculate available space correctly for last column', () => {
            const board = createTestBoard(5, 3)
            const result = getAvailableSpace(board, 1, 2)

            expect(result).toEqual({
                across: 0, // Only current cell in last column - 1 = 0
                down: 3,   // From position 1 to end (positions 1, 2, 3, 4) - 1 = 3
            })
        })
    })

    describe('With clue cells blocking', () => {
        it('should exclude clue cells from across calculation', () => {
            const board = createTestBoard(3, 5, [
                { rowIndex: 1, colIndex: 2, role: 'clue' },
                { rowIndex: 1, colIndex: 4, role: 'clue' },
            ])
            const result = getAvailableSpace(board, 1, 0)

            expect(result).toEqual({
                across: 2, // Positions 0, 1, 3 (excluding clue at position 2 and 4) - 1 = 2
                down: 1,   // From row 1 to end (rows 1, 2) = 2 positions - 1 = 1
            })
        })

        it('should exclude clue cells from down calculation', () => {
            const board = createTestBoard(5, 3, [
                { rowIndex: 2, colIndex: 1, role: 'clue' },
                { rowIndex: 4, colIndex: 1, role: 'clue' },
            ])
            const result = getAvailableSpace(board, 0, 1)

            expect(result).toEqual({
                across: 1, // From position 1 to end (positions 1, 2) - 1 = 1
                down: 2,   // Positions 0, 1, 3 (excluding clues at positions 2 and 4) - 1 = 2
            })
        })

        it('should handle consecutive clue cells', () => {
            const board = createTestBoard(4, 4, [
                { rowIndex: 2, colIndex: 1, role: 'clue' },
                { rowIndex: 2, colIndex: 2, role: 'clue' },
                { rowIndex: 2, colIndex: 3, role: 'clue' },
            ])
            const result = getAvailableSpace(board, 2, 0)

            expect(result).toEqual({
                across: 0, // Only position 0 available (excluding clues at 1, 2, 3) - 1 = 0
                down: 1,   // From position 2 to end (positions 2, 3) - 1 = 1
            })
        })

        it('should include solution cells in available space calculation', () => {
            const board = createTestBoard(3, 3, [
                { rowIndex: 1, colIndex: 1, role: 'solution' },
                { rowIndex: 1, colIndex: 2, role: 'solution' },
            ])
            const result = getAvailableSpace(board, 1, 0)

            expect(result).toEqual({
                across: 2, // All positions available (solutions are not excluded) - 1 = 2
                down: 1,   // From row 1 to end (rows 1, 2) = 2 positions - 1 = 1
            })
        })

        it('should include empty cells in available space calculation', () => {
            const board = createTestBoard(3, 3, [
                { rowIndex: 1, colIndex: 1, role: 'empty' },
                { rowIndex: 1, colIndex: 2, role: 'empty' },
            ])
            const result = getAvailableSpace(board, 1, 0)   
                expect(result).toEqual({
                across: 2, // All positions available (empty cells are not excluded) - 1 = 2
                down: 1,   // From row 1 to end (rows 1, 2) = 2 positions - 1 = 1
            })
        })
    })
})

describe('transformEditFormData.toApi', () => {
    it('should transform empty cell data correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 2,
            role: 'empty',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result).toEqual({
            rowIndex: 1,
            colIndex: 2,
            role: 'empty',
            solution: undefined,
            clueHorizontal: undefined,
            clueVertical: undefined,
        })
    })

    it('should transform solution cell data correctly', () => {
        const formData: EditFormData = {
            rowIndex: 2,
            colIndex: 3,
            role: 'solution',
            solution: '  a  ', // Should be trimmed and uppercased
        }

        const result = transformEditFormData.toApi(formData)

        expect(result).toEqual({
            rowIndex: 2,
            colIndex: 3,
            role: 'solution',
            solution: 'A',
            clueHorizontal: undefined,
            clueVertical: undefined,
        })
    })

    it('should transform horizontal clue cell data correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: '  sample clue  ',
            horizontalTextPlacement: 'left',
            verticalTextPlacement: 'top',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result).toEqual({
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            solution: undefined,
            clueHorizontal: {
                text: 'SAMPLE CLUE',
                imageUrl: undefined,
                textPlacement: {
                    horizontal: 'left',
                    vertical: 'top',
                },
            },
            clueVertical: undefined,
        })
    })

    it('should transform vertical clue cell data correctly', () => {
        const formData: EditFormData = {
            rowIndex: 2,
            colIndex: 2,
            role: 'clue',
            direction: 'vertical',
            verticalClueText: '  vertical clue  ',
            imageUrl: 'https://example.com/vertical.jpg',
            horizontalTextPlacement: 'center',
            verticalTextPlacement: 'bottom',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result).toEqual({
            rowIndex: 2,
            colIndex: 2,
            role: 'clue',
            solution: undefined,
            clueHorizontal: undefined,
            clueVertical: {
                text: 'VERTICAL CLUE',
                imageUrl: 'https://example.com/vertical.jpg',
                textPlacement: {
                    horizontal: 'center',
                    vertical: 'bottom',
                },
            },
        })
    })

    it('should transform multidirection clue cell data correctly', () => {
        const formData: EditFormData = {
            rowIndex: 3,
            colIndex: 3,
            role: 'clue',
            direction: 'multidirection',
            horizontalClueText: '  horizontal text  ',
            verticalClueText: '  vertical text  ',
            imageUrl: 'https://example.com/multi.jpg',
            horizontalTextPlacement: 'right',
            verticalTextPlacement: 'center',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result).toEqual({
            rowIndex: 3,
            colIndex: 3,
            role: 'clue',
            solution: undefined,
            clueHorizontal: {
                text: 'HORIZONTAL TEXT',
                imageUrl: '', // Should be empty for multidirection
                textPlacement: undefined, // Should be undefined for multidirection
            },
            clueVertical: {
                text: 'VERTICAL TEXT',
                imageUrl: '', // Should be empty for multidirection
                textPlacement: undefined, // Should be undefined for multidirection
            },
        })
    })

    it('should handle undefined and empty clue text correctly', () => {
        const formData: EditFormData = {
            rowIndex: 0,
            colIndex: 0,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: undefined,
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('')
    })

    it('should handle missing solution text for solution cells', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'solution',
            solution: undefined,
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.solution).toBeUndefined()
    })

    it('should use default text placement when not provided', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'test',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.textPlacement).toEqual({
            horizontal: 'center',
            vertical: 'center',
        })
    })
})

describe('transformEditFormData.toApi - Edge Cases', () => {
    it('should handle whitespace-only solution correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'solution',
            solution: '   ', // Only whitespace
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.solution).toBe('')
    })

    it('should handle empty string solution correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'solution',
            solution: '', // Empty string
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.solution).toBe('')
    })

    it('should handle whitespace-only clue text correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: '   ', // Only whitespace
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('')
    })

    it('should handle empty string clue text correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'vertical',
            verticalClueText: '', // Empty string
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueVertical?.text).toBe('')
    })

    it('should handle mixed case solution correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'solution',
            solution: 'aBc', // Mixed case
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.solution).toBe('ABC')
    })

    it('should handle mixed case clue text correctly', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'mixed Case TEXT', // Mixed case
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('MIXED CASE TEXT')
    })

    it('should handle clue cell without any clue text', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            // No horizontalClueText provided
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('')
    })

    it('should handle multidirection clue with only horizontal text', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'multidirection',
            horizontalClueText: 'horizontal only',
            // No verticalClueText provided
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('HORIZONTAL ONLY')
        expect(result.clueVertical?.text).toBe('')
    })

    it('should handle multidirection clue with only vertical text', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'multidirection',
            verticalClueText: 'vertical only',
            // No horizontalClueText provided
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.text).toBe('')      
        expect(result.clueVertical?.text).toBe('VERTICAL ONLY')
    })

    it('should handle undefined imageUrl for non-multidirection clues', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'test',
            imageUrl: undefined,
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.imageUrl).toBeUndefined()
    })

    it('should handle undefined text placement for non-multidirection clues', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'test',
            horizontalTextPlacement: undefined,
            verticalTextPlacement: undefined,
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.textPlacement).toEqual({
            horizontal: 'center',
            vertical: 'center',
        })
    })

    it('should handle partial text placement for non-multidirection clues', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'test',
            horizontalTextPlacement: 'left',
            // verticalTextPlacement not provided
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.textPlacement).toEqual({
            horizontal: 'left',
            vertical: 'center',
        })
    })

    it('should not create clue objects for empty role', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'empty',
            direction: 'horizontal', // Should be ignored
            horizontalClueText: 'should be ignored',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal).toBeUndefined()
        expect(result.clueVertical).toBeUndefined()
    })

    it('should not create solution for non-solution role', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            solution: 'should be ignored',
            direction: 'horizontal',
            horizontalClueText: 'test',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.solution).toBeUndefined()
    })
})

describe('getTextPlacement helper function', () => {
    it('should handle all text placement combinations', () => {
        const formData: EditFormData = {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            direction: 'horizontal',
            horizontalClueText: 'test',
            horizontalTextPlacement: 'right',
            verticalTextPlacement: 'bottom',
        }

        const result = transformEditFormData.toApi(formData)

        expect(result.clueHorizontal?.textPlacement).toEqual({
            horizontal: 'right',
            vertical: 'bottom',
        })
    })
})

