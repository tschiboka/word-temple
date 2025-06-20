import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EditModal } from '../EditModal'
import { defaultBoard } from '@common/components/Board/Board.defaults'
import type { Cell } from '@common'
import type { EditFormState } from '../../EditForm/EditForm.types'
import { mockDefaultCell } from '../../tests/CrosswordBuilder.mocks'

export const testHelpers = {
    customRender: (cell?: Cell) => {
        const initialFormState: EditFormState = {
            isOpen: true,
            cell: { ...mockDefaultCell, ...cell },
        }

        render(
            <EditModal
                initialFormState={initialFormState}
                board={defaultBoard}
                setFormState={() => {}}
                setBoard={() => {}}
            />,
        )

        return {
            user: userEvent.setup(),
        }
    },
}
