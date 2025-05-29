import type { BoardMode } from '../Board.types'
import type { Cell, CrosswordBoardResource } from '../../../types'
import './BoardCell.styles.scss'
import { match } from 'ts-pattern'
import { SolutionCell } from './SolutionCell'
import { ClueCell } from './ClueCell'

type BoardCellProps = {
    cell: Cell
    board: CrosswordBoardResource
    isRevealed?: boolean // Used in editor and game play to show solution
    disabled?: boolean // Used in gameplay to disable user interaction
    mode: BoardMode
    onClick?: (cell: Cell) => void
}

export const BoardCell = ({
    cell,
    board,
    isRevealed,
    disabled,
    mode,
    onClick,
}: BoardCellProps) => {
    const className = 'BoardCell' + (mode === 'view' ? ' BoardCell--view' : '')
    const renderedCell = match(cell.role)
        .with('solution', () => (
            <SolutionCell
                cell={cell}
                isRevealed={isRevealed}
                disabled={disabled}
                mode={mode}
                onClick={onClick}
            />
        ))
        .with('clue', () => (
            <ClueCell board={board} cell={cell} onClick={onClick} />
        ))
        .otherwise(() => (
            <div
                className="EmptyBox"
                onClick={() => !disabled && onClick?.(cell)}
            ></div>
        ))

    return <td className={className}>{renderedCell}</td>
}
