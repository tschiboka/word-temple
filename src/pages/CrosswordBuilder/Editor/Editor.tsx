import { BoardCell } from '../../../common/components/Button/BoardCell/BoardCell'
import type { CrosswordBoardResource } from '../../../common/types'
import './Editor.scss'

type EditorProps = {
    crossword?: CrosswordBoardResource
}

export const Editor = ({ crossword }: EditorProps) => {
    console.log('Editor props:', crossword)
    return (
        <table className="Editor">
            <tbody>
                {crossword?.cells.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`}>
                                <BoardCell cell={cell} isRevealed />
                                {cell?.solution || ''}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
