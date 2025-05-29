import {
    GoTriangleUp,
    GoTriangleDown,
    GoTriangleLeft,
    GoTriangleRight,
} from 'react-icons/go'
import type { Cell, CrosswordBoardResource } from '../../../types'

type ClueCellProps = {
    cell: Cell
    board: CrosswordBoardResource
    onClick?: (cell: Cell) => void
}

const getFontSize = (isSingle: boolean, length: number) => {
    if (isSingle) {
        if (length === 1) return 25
        if (length === 2) return 22
        if (length === 3) return 18
        if (length <= 4) return 13
        return 8
    } else {
        if (length === 1) return 18
        if (length === 2) return 14
        if (length === 3) return 12
        if (length <= 4) return 10
        return 8
    }
}

export const ClueCell = ({ cell, board, onClick }: ClueCellProps) => {
    const hasClue = cell.clueHorizontal || cell.clueVertical
    const isMultiClue = cell.clueHorizontal && cell.clueVertical
    const isSingleClue = hasClue && !isMultiClue

    const horizontalText = cell.clueHorizontal?.text || ''
    const verticalText = cell.clueVertical?.text || ''
    const clueText = horizontalText + verticalText
    const singleClueTextSize = getFontSize(true, clueText.length)

    const isLeftArrowVisible =
        cell.clueHorizontal &&
        board.meta.dimensions.colNumber === cell.colIndex + 1
    const isRightArrowVisible =
        cell.clueHorizontal &&
        board.meta.dimensions.colNumber !== cell.colIndex + 1
    const isUpArrowVisible =
        cell.clueVertical &&
        board.meta.dimensions.rowNumber === cell.rowIndex + 1
    const isDownArrowVisible =
        cell.clueVertical &&
        board.meta.dimensions.rowNumber !== cell.rowIndex + 1

    return (
        <div className="ClueBox" onClick={() => onClick?.(cell)}>
            <div className="ClueBoxArrows">
                {isUpArrowVisible && (
                    <div className="ClueBoxArrow--up">
                        <GoTriangleUp />
                    </div>
                )}
                {isDownArrowVisible && (
                    <div className="ClueBoxArrow--down">
                        <GoTriangleDown />
                    </div>
                )}
                {isLeftArrowVisible && (
                    <div className="ClueBoxArrow--left">
                        <GoTriangleLeft />
                    </div>
                )}
                {isRightArrowVisible && (
                    <div className="ClueBoxArrow--right">
                        <GoTriangleRight />
                    </div>
                )}
            </div>
            {isSingleClue && (
                <div
                    className="SingleClueCell"
                    style={{ fontSize: singleClueTextSize }}
                >
                    {cell.clueHorizontal?.text || cell.clueVertical?.text}
                </div>
            )}
            {isMultiClue && (
                <div className="MultiClueCell">
                    <div
                        className="ClueHorizontal"
                        style={{
                            fontSize: getFontSize(
                                false,
                                cell.clueHorizontal?.text.length || 0,
                            ),
                        }}
                    >
                        {cell.clueHorizontal?.text}
                    </div>
                    <div
                        className="ClueVertical"
                        style={{
                            fontSize: getFontSize(
                                false,
                                cell.clueVertical?.text.length || 0,
                            ),
                        }}
                    >
                        {cell.clueVertical?.text}
                    </div>
                </div>
            )}
        </div>
    )
}
