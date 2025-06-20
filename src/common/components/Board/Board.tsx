import { useRef, useEffect, useState } from 'react'
import { BoardRow } from './BoardRow/BoardRow'
import type { Cell, CrosswordBoardResource } from '../../types'
import type { BoardMode } from './Board.types'
import './Board.styles.scss'

type BoardProps = {
    crossword: CrosswordBoardResource
    mode: BoardMode
    onClick?: (cell: Cell) => void
}

export const Board = ({ crossword, mode, onClick }: BoardProps) => {
    const tableRef = useRef<HTMLTableElement>(null)
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

    useEffect(() => {
        function handleResize() {
            if (tableRef.current) {
                const { width, height } =
                    tableRef.current.getBoundingClientRect()
                setDimensions({ width, height })
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [crossword])

    return (
        <div className="Board">
            <table
                id="BoardTable"
                ref={tableRef}
                aria-label="Crossword Board Table"
            >
                <tbody>
                    {crossword?.cells.map((row, rowIndex) => (
                        <BoardRow
                            key={rowIndex}
                            row={row}
                            board={crossword}
                            rowIndex={rowIndex}
                            mode={mode}
                            onClick={onClick}
                            dimensions={dimensions}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}
