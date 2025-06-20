import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './EditForm.testHelpers'

const { customRender } = testHelpers

describe('Edit Form Component', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the Cell Type label', () => {
        customRender()

        const cellTypeLabel = screen.getByLabelText('Select Cell Type')
        expect(cellTypeLabel).toBeTruthy()
    })

    it('should render the Cell Type select with 3 options', async () => {
        const { user } = customRender({
            rowIndex: 1,
            colIndex: 1,
            role: 'empty',
        })

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        expect(options).toHaveLength(3)
        expect(options[0].textContent).toBe('Empty')
        expect(options[1].textContent).toBe('Solution')
        expect(options[2].textContent).toBe('Clue')
    })

    it('should restrict Cell Type for upper left corner cell', async () => {
        const { user } = customRender()

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        expect(options).toHaveLength(1)
        expect(options[0].textContent).toBe('Empty')
    })

    it('should restrict Cell Type for upper left corner cell', async () => {
        const { user } = customRender({
            rowIndex: 9,
            colIndex: 7,
            role: 'empty',
        })

        const cellTypeInput = screen.getByRole('textbox', {
            name: 'Select Cell Type Input',
        })
        await user.click(cellTypeInput)

        const options = screen.getAllByLabelText('Select Cell Type Option')
        expect(options).toHaveLength(1)
        expect(options[0].textContent).toBe('Solution')
    })

    it('should restrict clue direction for last row', async () => {
        const { user } = customRender({
            rowIndex: 9,
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

        const directionInput = screen.getByLabelText('Select Direction Input')
        await user.click(directionInput)

        const directionOptions = screen.getAllByLabelText(
            'Select Direction Option',
        )
        expect(directionOptions).toHaveLength(1)
        expect(directionOptions[0].textContent).toBe('Horizontal')
    })

    it('should restrict clue direction for last row', async () => {
        const { user } = customRender({
            rowIndex: 1,
            colIndex: 7,
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

        const directionInput = screen.getByLabelText('Select Direction Input')
        await user.click(directionInput)

        const directionOptions = screen.getAllByLabelText(
            'Select Direction Option',
        )
        expect(directionOptions).toHaveLength(1)
        expect(directionOptions[0].textContent).toBe('Vertical')
    })
})
