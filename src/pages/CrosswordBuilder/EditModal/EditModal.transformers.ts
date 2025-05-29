import type { Cell, HorizontalPlacements, TextPlacement, VerticalPlacements } from "../../../common/types";
import type { EditFormData } from "./EditModal.types";

const getTextPlacement = (horizontal?: HorizontalPlacements, vertical?: VerticalPlacements): TextPlacement | undefined => {
    return { horizontal: horizontal || 'center', vertical: vertical || 'center' };
}

export const transformEditFormData = {
    toApi: (data: EditFormData): Cell => ({
        rowIndex: data.rowIndex,
        colIndex: data.colIndex,
        role: data.role,
        solution: data.role === 'solution' ? data.solution?.toUpperCase().trim() : undefined,
        clueHorizontal: data.role === 'clue' && data.direction !== 'vertical' ? {
            text: (data.horizontalClueText || '').toUpperCase().trim(),
            imageUrl: data.direction !== 'multidirection' ? data.imageUrl : '',
            textPlacement: data.direction !== 'multidirection' 
                ? getTextPlacement(data.horizontalTextPlacement, data.verticalTextPlacement)
                : undefined,
        } : undefined,
        clueVertical: data.role === 'clue' && data.direction !== 'horizontal' ? {
            text: (data.verticalClueText || '').toUpperCase().trim(),
            imageUrl: data.direction !== 'multidirection' ? data.imageUrl : '',
            textPlacement: data.direction !== 'multidirection' 
                ? getTextPlacement(data.horizontalTextPlacement, data.verticalTextPlacement)
                : undefined,
        } : undefined,
    }),
}