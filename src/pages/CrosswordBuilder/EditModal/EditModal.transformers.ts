import type { Cell } from "../../../common/types";
import type { EditFormData } from "./EditModal.types";

export const transformEditFormData = {
    toApi: (data: EditFormData): Cell => ({
        rowIndex: data.rowIndex,
        colIndex: data.colIndex,
        role: data.role,
        solution: data.role === 'solution' ? data.solution?.toUpperCase().trim() : undefined,
        clueHorizontal: data.role === 'clue' && data.direction !== 'vertical' ? {
            text: (data.horizontalClueText || '').toUpperCase().trim(),
            imageUrl: data.direction === 'horizontal' ? data.imageUrl : '',
            textPlacement: data.direction === 'horizontal' ? data.textPlacement || 'center': undefined,
        } : undefined,
        clueVertical: data.role === 'clue' && data.direction !== 'horizontal' ? {
            text: (data.verticalClueText || '').toUpperCase().trim(),
            imageUrl: data.direction === 'vertical' ? data.imageUrl : '',
            textPlacement: data.direction === 'vertical' ? data.textPlacement || 'center': undefined,
        } : undefined,
    }),
}