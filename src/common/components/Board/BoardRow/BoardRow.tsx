import type { BoardMode } from '../Board.types'
import type { Cell, CrosswordBoardResource } from '../../../types'
import { BoardCell } from '../BoardCell/BoardCell'
import './BoardRow.styles.scss'

type BoardRowProps = {
    row: Cell[]
    rowIndex: number
    board: CrosswordBoardResource
    mode: BoardMode
    dimensions?: { width: number; height: number }
    onClick?: (cell: Cell) => void
}

export const BoardRow = ({
    row,
    rowIndex,
    board,
    mode,
    dimensions,
    onClick,
}: BoardRowProps) => (
    <tr className="BoardRow">
        {row.map((cell, colIndex) => (
            <BoardCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                board={board}
                isRevealed
                mode={mode}
                dimensions={dimensions}
                onClick={onClick}
            />
        ))}
    </tr>
)
