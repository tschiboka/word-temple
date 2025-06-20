import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './CrosswordBuilder.testHelpers'
import {
    DEFAULT_COL_NUMBER,
    DEFAULT_ROW_NUMBER,
} from '@common/components/Board/Board.defaults'

const { customRender } = testHelpers

describe('CrosswordBuilder Component', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the Crossword Builder title', () => {
        customRender()

        const title = screen.getByRole('heading', {
            name: 'Crossword Builder',
            level: 1,
        })
        expect(title).toBeTruthy()
        expect(title.textContent).toBe('Crossword Builder')
    })

    it('should render the Board component with default number of rows and columns', () => {
        customRender()

        const boardTable = screen.getByRole('table', {
            name: 'Crossword Board Table',
        })
        expect(boardTable).toBeTruthy()
        expect(boardTable.tagName).toBe('TABLE')

        const rows = boardTable.querySelectorAll('tr')
        expect(rows).toHaveLength(DEFAULT_ROW_NUMBER)

        rows.forEach((row) => {
            const cells = row.querySelectorAll('td')
            expect(cells).toHaveLength(DEFAULT_COL_NUMBER)
        })
    })

    it('should render all required buttons', () => {
        customRender()

        const saveButton = screen.getByRole('button', { name: 'Save' })
        expect(saveButton).toBeTruthy()

        const loadButton = screen.getByRole('button', { name: 'Load' })
        expect(loadButton).toBeTruthy()

        const clearButton = screen.getByRole('button', { name: 'Clear' })
        expect(clearButton).toBeTruthy()

        const homeButton = screen.getByRole('button', { name: 'Home' })
        expect(homeButton).toBeTruthy()

        const helpButton = screen.getByRole('button', { name: 'Help' })
        expect(helpButton).toBeTruthy()
    })

    it('should open Edit Modal and board info when cell is clicked', async () => {
        const { user } = customRender()

        const firstCell = screen.getByLabelText('Row 1 Column 1')
        expect(firstCell).toBeTruthy()
        await user.click(firstCell)

        const modalTitle = screen.getByRole('heading', {
            name: 'Edit Crossword Cell',
        })
        expect(modalTitle).toBeTruthy()
    })
})
