import { render } from '@testing-library/react'
import { MemoryRouter, useLocation } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import App from './App'
import { testHelpers as helperFunctions } from '@common/utils/testHelpers'

export const testHelpers = {
    LocationDisplay: () => {
        const location = useLocation()
        return <div data-testid="location-display">{location.pathname}</div>
    },
    customRender: () => {
        render(
            <MemoryRouter>
                <App />
                <testHelpers.LocationDisplay />
            </MemoryRouter>,
        )
        return { user: userEvent.setup(), ...helperFunctions }
    },
}
