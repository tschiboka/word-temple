import type { Cell } from '../../../types'
import type { BoardMode } from '../Board.types'

type SolutionCellProps = {
    cell: Cell
    disabled?: boolean
    isRevealed?: boolean
    mode: BoardMode
    ariaLabel: string
    onClick?: (cell: Cell) => void
}

export const SolutionCell = ({
    cell,
    disabled,
    isRevealed,
    mode,
    ariaLabel,
    onClick,
}: SolutionCellProps) => {
    const solutionChar =
        cell.solution?.length === 1 ? cell.solution : cell.solution?.[0] || ''
    return (
        <div
            className="SolutionBox"
            aria-label={ariaLabel}
            onClick={() => !disabled && onClick?.(cell)}
        >
            {(isRevealed || mode === 'view') && solutionChar}
        </div>
    )
}
