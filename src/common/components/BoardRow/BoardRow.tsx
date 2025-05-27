import type { BoardMode } from '../Board/Board.types'
import type { Cell } from '../../types'
import { BoardCell } from '../Button/BoardCell/BoardCell'
import './BoardRow.styles.scss'

type BoardRowProps = {
    row: Cell[]
    rowIndex: number
    mode: BoardMode
    onClick?: (cell: Cell) => void
}

export const BoardRow = ({ row, rowIndex, mode, onClick }: BoardRowProps) => (
    <tr className="BoardRow">
        {row.map((cell, colIndex) => (
            <BoardCell
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                isRevealed
                mode={mode}
                onClick={onClick}
            />
        ))}
    </tr>
)
