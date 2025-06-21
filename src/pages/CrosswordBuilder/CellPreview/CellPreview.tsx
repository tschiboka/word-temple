import { BoardCell } from '@common'
import type { CrosswordBoardResource } from '@common'
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
                            ariaLabel={`Preview Cell`}
                        />
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
