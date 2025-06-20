import { screen } from '@testing-library/react'
import { expect } from 'vitest'

export const testHelpers = {
    location: {
        checkLocation: async (expectedPath: string) => {
            const locationDisplay = await screen.findByTestId('location-display')
            expect(locationDisplay.textContent).toBe(expectedPath)
        }
    }
}