import type { BoardMode } from '../Board.types'
import type { Cell } from '../../../types'
import './BoardCell.styles.scss'

type BoardCellProps = {
    cell: Cell
    isRevealed?: boolean // Used in editor and game play to show solution
    disabled?: boolean // Used in gameplay to disable user interaction
    onClick?: (cell: Cell) => void
    mode: BoardMode
}

export const BoardCell = ({
    cell,
    isRevealed,
    disabled,
    onClick,
}: BoardCellProps) => (
    <td className="BoardCell">
        <div
            className="SolutionBox"
            onClick={() => !disabled && onClick?.(cell)}
        >
            {isRevealed && cell.solution}
        </div>
    </td>
)
