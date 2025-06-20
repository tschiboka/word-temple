import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { CrosswordBuilder } from '../CrosswordBuilder'

export const testHelpers = {
    customRender: () => {
        render(
            <MemoryRouter>
                <CrosswordBuilder />
            </MemoryRouter>,
        )
        return { user: userEvent.setup() }
    },
}
