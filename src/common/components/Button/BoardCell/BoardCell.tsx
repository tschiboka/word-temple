import type { Cell } from '../../../types'

type BoardCellProps = {
    cell: Cell
    isRevealed?: boolean // Used in editor and game play to show solution
    disabled?: boolean // Used in gameplay to disable user interaction
    onClick?: (cell: Cell) => void
}

export const BoardCell = ({}: BoardCellProps) => {
    return <div>C</div>
}
