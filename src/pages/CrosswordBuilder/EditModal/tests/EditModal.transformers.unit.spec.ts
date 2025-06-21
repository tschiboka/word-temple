import { describe, it, expect } from 'vitest'
import { transformEditFormData } from '../EditModal.transformers'
import type { EditFormData } from '../../EditForm/EditForm.types'

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
