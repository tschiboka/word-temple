import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect } from 'vitest'
import App from './App'

const customRender = () => {
    return render(
        <MemoryRouter>
            <App />
        </MemoryRouter>,
    )
}

describe('App Component', () => {
    it('renders the Crossword Builder button', () => {
        customRender()

        const builderButton = screen.getByRole('button', {
            name: 'Crossword Builder',
        })
        expect(builderButton).toBeTruthy()
        expect(builderButton.textContent).toBe('Crossword Builder')
    })
})
