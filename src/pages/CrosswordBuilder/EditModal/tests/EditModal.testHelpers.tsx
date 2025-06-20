import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest'
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

        const mockSetFormState = vi.fn()
        const mockSetBoard = vi.fn()

        render(
            <EditModal
                initialFormState={initialFormState}
                board={defaultBoard}
                setFormState={mockSetFormState}
                setBoard={mockSetBoard}
            />,
        )

        return {
            user: userEvent.setup(),
            closeModal: mockSetFormState,
            setFormState: mockSetFormState,
            setBoard: mockSetBoard,
        }
    },
}
