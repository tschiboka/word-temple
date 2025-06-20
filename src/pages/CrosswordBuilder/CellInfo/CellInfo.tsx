import { getAvailableSpace } from '../EditModal'
import type { Cell, CrosswordBoardResource } from '@common'

type CellInfoProps = {
    board: CrosswordBoardResource
    cell: Cell
}
export const CellInfo = ({ board, cell }: CellInfoProps) => {
    const availableSpace =
        cell && getAvailableSpace(board, cell.rowIndex, cell.colIndex)
    return (
        <div className="CellInfo" aria-label="Cell Information">
            <div className="EditModalInfoPair">
                <div>
                    Title:{' '}
                    <span className="highlight" aria-label="Board Title">
                        {board.meta.title || 'Untitled'}
                    </span>
                </div>
                <div>
                    Size:{' '}
                    <span className="highlight" aria-label="Board Size">
                        {' '}
                        {board.meta.dimensions.rowNumber} &times;{' '}
                        {board.meta.dimensions.colNumber}
                    </span>
                </div>
            </div>
            <div className="EditModalInfoPair">
                <div>
                    Row Index:{' '}
                    <span className="highlight" aria-label="Row Index">
                        {cell.rowIndex}
                    </span>
                </div>
                <div>
                    Col Index:{' '}
                    <span className="highlight" aria-label="Column Index">
                        {cell.colIndex}
                    </span>
                </div>
            </div>
            <div className="EditModalInfoPair">
                <div>
                    Space Across:{' '}
                    <span
                        className="highlight"
                        aria-label="Available Space Across"
                    >
                        {availableSpace?.across || '-'}
                    </span>
                </div>
                <div>
                    Space Down:{' '}
                    <span
                        className="highlight"
                        aria-label="Available Space Down"
                    >
                        {availableSpace?.down || '-'}
                    </span>
                </div>
            </div>
        </div>
    )
}
