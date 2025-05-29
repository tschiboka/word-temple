import * as yup from 'yup'
import type { Direction, EditFormData } from '../EditModal'
import type { HorizontalPlacements, VerticalPlacements } from '../../../common/types';

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
    horizontalTextPlacement: yup.string().oneOf(['left', 'right', 'center']).optional(),
    verticalTextPlacement: yup.string().oneOf(['top', 'bottom', 'center']).optional(),
    horizontalClueText: yup.string().when(
      ['direction', 'horizontalTextPlacement'],
        (values: unknown[], schema: yup.StringSchema) => 
            getClueTextSchema(values, schema, 'horizontal')
    ),
    verticalClueText: yup.string().when(
      ['direction', 'verticalTextPlacement'],
        (values: unknown[], schema: yup.StringSchema) => 
            getClueTextSchema(values, schema, 'vertical')
    ),
    imageUrl: yup.string().url('Must be a valid URL').optional(),
})

/*
 * Some rules to consider for cell validation:
 *   - Clues can be horizontal or vertical and have placement options, such as left, right, center, top, bottom,
 *   - A cell can hold both directions — “multi-directional clues”,
 *   - Images are not allowed in multi-directional clues due to space constraints,
 *   - Non-centered single-direction clues are restricted to 8 characters,
 *   - Centered single-direction clues can be up to 21 characters,
 *   - Multi-directional clues are limited to 14 characters for each direction,
 */

const getMaxClueLength = (
  direction: string,
  horizontalTextPlacement?: HorizontalPlacements,
  verticalTextPlacement?: VerticalPlacements
): number => {
    const isHorizontalCentered =
        horizontalTextPlacement === 'center' || direction === 'multidirection';
    const isVerticalCentered = 
        verticalTextPlacement === 'center' || direction === 'multidirection';
    const isCentered =
        isHorizontalCentered ||
        isVerticalCentered ||
        direction === 'multidirection'

    if (direction === 'multidirection') return 14
    if (isCentered) return 21
    return 8
};

const getClueTextSchema = (values: unknown[], schema: yup.StringSchema, selectedDirection: Direction) => {
    const [direction, placement] = values as [string, string]
    if (direction === selectedDirection || direction === 'multidirection') {
      const maxLength = getMaxClueLength(
        direction,
        selectedDirection === 'horizontal' ? placement as HorizontalPlacements : undefined,
        selectedDirection === 'vertical' ? placement as VerticalPlacements : undefined
      )
      return schema
        .required('Horizontal clue text is required')
        .max(maxLength, `Max ${maxLength} characters allowed`)
        .matches(/^[A-Za-z0-9 \-_']+$/, 'Only alphanumerics and -_\' symbols allowed');
    }
    return schema.optional()
}