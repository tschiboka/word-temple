import { BoardCell } from '../../../common/components/Board/BoardCell/BoardCell'
import type { CrosswordBoardResource } from '../../../common/types'
import { transformEditFormData, type EditFormData } from '../EditModal'
import './CellPreview.styles.scss'

type CellPreviewProps = {
    formData: EditFormData
    board: CrosswordBoardResource
}

export const CellPreview = ({ formData, board }: CellPreviewProps) => {
    const updatedCellPreview = transformEditFormData.toApi(formData)
    return (
        <div className="CellPreview">
            <table>
                <tbody>
                    <tr>
                        <BoardCell
                            board={board}
                            cell={updatedCellPreview}
                            mode="view"
                        />
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
