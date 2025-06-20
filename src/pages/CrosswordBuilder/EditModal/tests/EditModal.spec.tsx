import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './EditModal.testHelpers'
import {
    mockDefaultCell,
    submitState,
} from '../../tests/CrosswordBuilder.mocks'

const { customRender } = testHelpers

describe('Edit Modal Component - Cell Information', () => {
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

    it('should close the modal on Cancel button click', async () => {
        const { user, closeModal } = customRender()

        const cancelButton = screen.getByRole('button', { name: 'Cancel' })
        expect(cancelButton).toBeTruthy()

        await user.click(cancelButton)
        expect(closeModal).toHaveBeenCalledWith({
            isOpen: false,
            cell: mockDefaultCell,
        })
    })

    it('should save a solution cell with letter input', async () => {
        const { user, setFormState } = customRender({
            rowIndex: 2,
            colIndex: 2,
            role: 'empty',
        })

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        const solutionOption = options[1]
        expect(solutionOption.textContent).toBe('Solution')
        await user.click(solutionOption)

        await screen.findByLabelText('Solution Input')

        const letterInput = screen.getByLabelText('Solution Input')
        await user.clear(letterInput)
        await user.type(letterInput, 'A')

        const saveButton = screen.getByRole('button', { name: 'Save' })
        await user.click(saveButton)

        expect(setFormState).toHaveBeenCalledWith(submitState.solution)
    })

    it('should save a clue cell with clue text and direction', async () => {
        const { user, setFormState } = customRender({
            rowIndex: 1,
            colIndex: 1,
            role: 'empty',
        })

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        const clueOption = options[2]
        expect(clueOption.textContent).toBe('Clue')
        await user.click(clueOption)

        await screen.findByLabelText('Select Direction Input')

        const directionInput = screen.getByLabelText('Select Direction Input')
        await user.click(directionInput)

        const directionOptions = screen.getAllByLabelText(
            'Select Direction Option',
        )
        const horizontalOption = directionOptions[0]
        expect(horizontalOption.textContent).toBe('Horizontal')
        await user.click(horizontalOption)

        const clueTextInput = screen.getByLabelText('Horizontal Clue Input')
        await user.type(clueTextInput, 'Sample clue text')

        const saveButton = screen.getByRole('button', { name: 'Save' })
        await user.click(saveButton)

        expect(setFormState).toHaveBeenCalledWith(
            submitState.singleDirectionClue,
        )
    })

    it('should save a multidimensional cell with both horizontal and vertical clues', async () => {
        const { user, setFormState } = customRender({
            rowIndex: 2,
            colIndex: 2,
            role: 'empty',
        })

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        const clueOption = options[2]
        expect(clueOption.textContent).toBe('Clue')
        await user.click(clueOption)

        await screen.findByLabelText('Select Direction Input')

        const directionInput = screen.getByLabelText('Select Direction Input')
        await user.click(directionInput)

        const directionOptions = screen.getAllByLabelText(
            'Select Direction Option',
        )
        const multiDirectionOption = directionOptions.find(
            (option) => option.textContent === 'Multi Direction',
        )
        expect(multiDirectionOption).toBeDefined()
        await user.click(multiDirectionOption!)

        const horizontalClueInput = screen.getByLabelText(
            'Horizontal Clue Input',
        )
        await user.type(horizontalClueInput, 'Hor. Clue')

        const verticalClueInput = screen.getByLabelText('Vertical Clue Input')
        await user.type(verticalClueInput, 'Ver. Clue')

        const saveButton = screen.getByRole('button', { name: 'Save' })
        await user.click(saveButton)

        expect(setFormState).toHaveBeenCalledWith(
            submitState.multiDirectionClue,
        )
    })
})
