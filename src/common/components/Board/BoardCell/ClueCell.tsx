import { GoTriangleDown, GoTriangleRight } from 'react-icons/go'
import type { Cell, CrosswordBoardResource } from '../../../types'
import { useState } from 'react'
import { getCellProperties } from './BoardCell.selectors'
import type { BoardMode } from '../Board.types'

type ClueCellProps = {
    cell: Cell
    board: CrosswordBoardResource
    mode: BoardMode
    ariaLabel: string
    onClick?: (cell: Cell) => void
}

const getFontSize = (isSingle: boolean, length: number) => {
    if (isSingle) {
        if (length === 1) return 25
        if (length === 2) return 22
        if (length === 3) return 18
        if (length <= 6) return 12
        return 8
    } else {
        if (length === 1) return 18
        if (length === 2) return 14
        if (length === 3) return 12
        if (length <= 4) return 10
        return 8
    }
}

export const ClueCell = ({
    cell,
    board,
    mode,
    ariaLabel,
    onClick,
}: ClueCellProps) => {
    const [zoomed, setZoomed] = useState(false)

    const {
        isArrowVisible,
        isSingleClue,
        isMultiClue,
        hasNonCenteredPlacement,
        positions,
        clueText,
        getClassName,
    } = getCellProperties(board, cell, mode)

    return (
        <div
            className={getClassName(zoomed)}
            onClick={() => onClick?.(cell)}
            onMouseDown={() => setZoomed(true)}
            onMouseUp={() => setZoomed(false)}
            aria-label={ariaLabel}
        >
            <div className="ClueBoxArrows">
                {isArrowVisible.down && (
                    <div className="ClueBoxArrow--down">
                        <GoTriangleDown />
                    </div>
                )}
                {isArrowVisible.right && (
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
