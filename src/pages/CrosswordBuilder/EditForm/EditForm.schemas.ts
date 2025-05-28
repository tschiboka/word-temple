import * as yup from 'yup'
import type { EditFormData } from '../EditModal'

export const editFormSchema: yup.ObjectSchema<EditFormData> = yup.object({
  rowIndex: yup.number().required(),
  colIndex: yup.number().required(),
    role: yup.string().oneOf(['empty', 'solution', 'clue']).required(),
    solution: yup.string().optional().when('role', {
        is: "solution",
        then: schema => schema.required('Solution is required')
            .max(1, 'Solution must be 1 character long')
            .matches(/^[A-Za-z]+$/, 'Only letters are allowed'),
        otherwise: schema => schema.optional(),
    }),
    direction: yup.string().oneOf(['horizontal', 'vertical', 'multidirection']).optional().when('role', {
        is: "clue",
        then: schema => schema.required('Direction is required'),
        otherwise: schema => schema.optional(),
    }),
    horizontalClueText: yup.string().optional().when('direction', {
        is: (direction: string) => direction === 'horizontal' || direction === 'multidirection',
        then: schema => schema.required('Horizontal clue text is required').max(40, 'Maximum 40 characters'),
        otherwise: schema => schema.optional(), 
    }),
    verticalClueText: yup.string().optional().when('direction', {
        is: (direction: string) => direction === 'vertical' || direction === 'multidirection',
        then: schema => schema.required('Vertical clue text is required').max(40, 'Maximum 40 characters'),
        otherwise: schema => schema.optional(),
    }),
    imageUrl: yup.string().url('Must be a valid URL').optional(),
    textPlacement: yup.string().oneOf(['left', 'right', 'top', 'bottom', "center"]).optional(),
})