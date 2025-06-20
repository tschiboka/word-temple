import { Cell } from "@common";
import { EditFormState } from "../EditModal";

export const mockDefaultCell: Cell = {
    rowIndex: 0,
    colIndex: 0,
    role: 'empty',
}

export const submitState: Record<string, EditFormState> = {
    solution: {
        isOpen: false,
        cell: {
            rowIndex: 2,
            colIndex: 2,
            role: 'solution',
            solution: 'A',
        }},
    singleDirectionClue: {
        isOpen: false,
        cell: {
            rowIndex: 1,
            colIndex: 1,
            role: 'clue',
            clueHorizontal: {
                imageUrl: '',
                text: 'SAMPLE CLUE TEXT',
                textPlacement: {
                    horizontal: 'center',
                    vertical: 'center',
                },
            },
            clueVertical: undefined,
            solution: undefined,
        },
    },
    multiDirectionClue: {
        isOpen: false,
        cell: {
            rowIndex: 2,
            colIndex: 2,
            role: 'clue',
            clueHorizontal: {
                imageUrl: '',
                text: 'HOR. CLUE',
                textPlacement: undefined,
            },
            clueVertical: {
                imageUrl: '',
                text: 'VER. CLUE',
                textPlacement: undefined,
            },
            solution: undefined,
        },
    }
}