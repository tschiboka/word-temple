import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditForm } from '../EditForm'
import { defaultBoard } from '@common/components/Board/Board.defaults'
import type { Cell } from '@common'
import { mockDefaultCell } from '../../tests/CrosswordBuilder.mocks'

export const testHelpers = {
    customRender: (cell?: Cell) => {
        render(
            <EditForm
                cell={{ ...mockDefaultCell, ...cell }}
                board={defaultBoard}
                onSubmit={() => {}}
                setClose={() => {}}
            />,
        )

        return {
            user: userEvent.setup(),
        }
    },
}
