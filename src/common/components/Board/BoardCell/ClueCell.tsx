import { GoTriangleDown, GoTriangleRight } from 'react-icons/go'
import type { Cell, CrosswordBoardResource } from '../../../types'
import { useState } from 'react'

type ClueCellProps = {
    cell: Cell
    board: CrosswordBoardResource
    onClick?: () => void
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
    const [zoomed, setZoomed] = useState(true)
    console.log(zoomed)
    const hasClue = cell.clueHorizontal || cell.clueVertical
    const isMultiClue = cell.clueHorizontal && cell.clueVertical
    const isSingleClue = hasClue && !isMultiClue

    const isRightArrowVisible =
        cell.clueHorizontal &&
        board.meta.dimensions.colNumber !== cell.colIndex + 1
    const isDownArrowVisible =
        cell.clueVertical &&
        board.meta.dimensions.rowNumber !== cell.rowIndex + 1

    const positions = {
        horizontal: cell.clueHorizontal
            ? cell.clueHorizontal?.textPlacement?.horizontal
            : cell.clueVertical?.textPlacement?.horizontal,
        vertical: cell.clueHorizontal
            ? cell.clueHorizontal?.textPlacement?.vertical
            : cell.clueVertical?.textPlacement?.vertical,
    }
    const hasNonCenteredPlacement =
        positions.horizontal !== 'center' || positions.vertical !== 'center'

    const horizontalText = cell.clueHorizontal?.text || ''
    const verticalText = cell.clueVertical?.text || ''
    const clueText = horizontalText + verticalText
    const getClassName = (cls: string) => (zoomed ? `${cls} zoomed` : cls)

    return (
        <div
            className={getClassName('ClueBox')}
            onClick={() => onClick?.()}
            onMouseDown={() => setZoomed(true)}
            onMouseUp={() => setZoomed(false)}
        >
            <div className="ClueBoxArrows">
                {isDownArrowVisible && (
                    <div className="ClueBoxArrow--down">
                        <GoTriangleDown />
                    </div>
                )}
                {isRightArrowVisible && (
                    <div className="ClueBoxArrow--right">
                        <GoTriangleRight />
                    </div>
                )}
            </div>
            {isSingleClue && !hasNonCenteredPlacement && (
                <div
                    className="SingleClueCell"
                    style={{ fontSize: getFontSize(true, clueText.length) }}
                >
                    {cell.clueHorizontal?.text || cell.clueVertical?.text}
                </div>
            )}
            {isSingleClue && hasNonCenteredPlacement && (
                <div
                    className="SingleClueCell SingleClueCell--non-centered"
                    style={{
                        top: positions.vertical === 'top' ? 0 : 'auto',
                        bottom: positions.vertical === 'bottom' ? 0 : 'auto',
                        left: positions.horizontal === 'left' ? 0 : 'auto',
                        right: positions.horizontal === 'right' ? 0 : 'auto',
                    }}
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
