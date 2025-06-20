import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './EditModal.testHelpers'

const { customRender } = testHelpers

describe('EditModal Component - Cell Information', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the correct cell information with aria-labels', () => {
        customRender()

        const boardTitle = screen.getByLabelText('Board Title')
        expect(boardTitle).toBeTruthy()
        expect(boardTitle.textContent).toBe('Untitled')

        const boardSize = screen.getByLabelText('Board Size')
        expect(boardSize).toBeTruthy()
        expect(boardSize.textContent?.trim()).toBe('10 × 8')

        const rowIndex = screen.getByLabelText('Row Index')
        expect(rowIndex).toBeTruthy()
        expect(rowIndex.textContent).toBe('0')

        const colIndex = screen.getByLabelText('Column Index')
        expect(colIndex).toBeTruthy()
        expect(colIndex.textContent).toBe('0')

        const spaceAcross = screen.getByLabelText('Available Space Across')
        expect(spaceAcross).toBeTruthy()
        expect(spaceAcross.textContent).toBe('7')

        const spaceDown = screen.getByLabelText('Available Space Down')
        expect(spaceDown).toBeTruthy()
        expect(spaceDown.textContent).toBe('9')
    })

    it('should render Save and Cancel buttons', () => {
        customRender()

        const saveButtons = screen.getByRole('button', { name: 'Save' })
        expect(saveButtons.textContent).toBe('Save')

        const cancelButtons = screen.getByRole('button', { name: 'Cancel' })
        expect(cancelButtons.textContent).toBe('Cancel')
    })
})
