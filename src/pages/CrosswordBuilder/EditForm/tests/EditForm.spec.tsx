import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './EditForm.testHelpers'

const { customRender } = testHelpers

describe('EditForm Component', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the Cell Type label', () => {
        customRender()

        const cellTypeLabel = screen.getByText('Cell Type')
        expect(cellTypeLabel).toBeTruthy()
    })
})
