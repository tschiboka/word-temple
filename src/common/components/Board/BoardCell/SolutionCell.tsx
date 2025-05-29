import type { Cell } from '../../../types'
import type { BoardMode } from '../Board.types'

type SolutionCellProps = {
    cell: Cell
    disabled?: boolean
    isRevealed?: boolean
    mode: BoardMode
    onClick?: (cell: Cell) => void
}

export const SolutionCell = ({
    cell,
    disabled,
    isRevealed,
    mode,
    onClick,
}: SolutionCellProps) => {
    const solutionChar =
        cell.solution?.length === 1 ? cell.solution : cell.solution?.[0] || ''
    return (
        <div
            className="SolutionBox"
            onClick={() => !disabled && onClick?.(cell)}
        >
            {(isRevealed || mode === 'view') && solutionChar}
        </div>
    )
}
