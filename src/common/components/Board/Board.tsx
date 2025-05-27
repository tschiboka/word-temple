import { BoardRow } from '../BoardRow/BoardRow'
import type { Cell, CrosswordBoardResource } from '../../types'
import type { BoardMode } from './Board.types'
import './Board.styles.scss'

type BoardProps = {
    crossword: CrosswordBoardResource
    mode: BoardMode
    onClick?: (cell: Cell) => void
}

export const Board = ({ crossword, mode, onClick }: BoardProps) => (
    <div className="Board">
        <table>
            <tbody>
                {crossword?.cells.map((row, rowIndex) => (
                    <BoardRow
                        key={rowIndex}
                        row={row}
                        rowIndex={rowIndex}
                        mode={mode}
                        onClick={onClick}
                    ></BoardRow>
                ))}
            </tbody>
        </table>
    </div>
)
