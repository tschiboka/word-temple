import type { Cell, CrosswordBoardResource } from "../../../types"
import type { BoardMode } from "../Board.types"

export const getCellProperties = (board: CrosswordBoardResource,  cell: Cell, mode: BoardMode) => {
    const hasClue = Boolean(cell.clueHorizontal?.text || cell.clueVertical?.text)
    const isMultiClue = Boolean(cell.clueHorizontal?.text && cell.clueVertical?.text)
    const isSingleClue = hasClue && !isMultiClue
    
    const {colNumber, rowNumber} = board.meta.dimensions
    const isAtLastRow = rowNumber === cell.rowIndex + 1
    const isAtLastCol = colNumber === cell.colIndex + 1
    const isRightArrowVisible = cell.clueHorizontal?.text && !isAtLastCol
    const isDownArrowVisible = cell.clueVertical?.text && !isAtLastRow
    const isArrowVisible = {
        right: isRightArrowVisible,
        down: isDownArrowVisible,
    }

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

    const getClassName = (zoomed: boolean) => {
        const zoomedClass = zoomed ? ' zoomed' : ''
        const shiftRightClass = zoomed && cell.colIndex === 0 ? " zoom-shift-right" : ""
        const shiftUpClass = zoomed && isAtLastRow ? " zoom-shift-up" : ""
        const shiftDownClass = zoomed && cell.rowIndex === 0 ? " zoom-shift-down" : ""
        const shiftUpRightClass = zoomed && cell.colIndex === 0 && isAtLastRow ? " zoom-shift-up-right" : ""
        return mode === "view" 
            ? `ClueBox${zoomedClass}`
            : `ClueBox${zoomedClass}${shiftRightClass}${shiftDownClass}${shiftUpClass}${shiftUpRightClass}`
    }

    return {
        clueText,
        isArrowVisible,
        isSingleClue,
        isMultiClue,
        positions,
        hasNonCenteredPlacement,
        getClassName,
    }
}

