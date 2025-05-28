import { getAvailableSpace } from '../EditModal'
import type { Cell, CrosswordBoardResource } from '../../../common/types'

type CellInfoProps = {
    board: CrosswordBoardResource
    cell: Cell
}
export const CellInfo = ({ board, cell }: CellInfoProps) => {
    const availableSpace =
        cell && getAvailableSpace(board, cell.rowIndex, cell.colIndex)
    return (
        <div className="CellInfo">
            <div className="EditModalInfoPair">
                <div>
                    Title:{' '}
                    <span className="highlight">
                        {board.meta.title || 'Untitled'}
                    </span>
                </div>
                <div>
                    Size:{' '}
                    <span className="highlight">
                        {' '}
                        {board.meta.dimensions.rowNumber} &times;{' '}
                        {board.meta.dimensions.colNumber}
                    </span>
                </div>
            </div>
            <div className="EditModalInfoPair">
                <div>
                    Row Index:{' '}
                    <span className="highlight">{cell.rowIndex}</span>
                </div>
                <div>
                    Col Index:{' '}
                    <span className="highlight">{cell.colIndex}</span>
                </div>
            </div>
            <div className="EditModalInfoPair">
                <div>
                    Space Across:{' '}
                    <span className="highlight">
                        {availableSpace?.across || '-'}
                    </span>
                </div>
                <div>
                    Space Down:{' '}
                    <span className="highlight">
                        {availableSpace?.down || '-'}
                    </span>
                </div>
            </div>
        </div>
    )
}
