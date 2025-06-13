import type { CrosswordBoardResource } from "@common";
import type { AvailableBoardSpace } from './EditModal.types'

export const getAvailableSpace = (board: CrosswordBoardResource, rowIndex: number, colIndex: number): AvailableBoardSpace  => {
    const cellsLeftAcross = board.cells[rowIndex].slice(colIndex).filter(cell => cell.role !== 'clue').length - 1;
    const cellsLeftDown = board.cells.slice(rowIndex).map(row => row[colIndex]).filter(cell => cell.role !== 'clue').length - 1;
    return {
        across: cellsLeftAcross,
        down: cellsLeftDown
    };
}