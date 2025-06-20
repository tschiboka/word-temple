import { screen, cleanup } from '@testing-library/react'
import { describe, it, expect, beforeEach } from 'vitest'
import { testHelpers } from './App.testHelpers'
import { pathBuilder } from '@common'

const { customRender } = testHelpers

describe('App Component', () => {
    beforeEach(() => {
        cleanup()
    })

    it('should render the Crossword Builder button and navigates correctly', async () => {
        const { user, location } = customRender()
        await location.checkLocation(pathBuilder('HOME'))

        const builderButton = screen.getByRole('button', {
            name: 'Crossword Builder',
        })
        expect(builderButton).toBeTruthy()

        await user.click(builderButton)
        await location.checkLocation(pathBuilder('BUILDER'))
    })
})
