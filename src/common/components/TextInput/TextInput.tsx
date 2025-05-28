import {
    Controller,
    type Control,
    type FieldValues,
    type Path,
} from 'react-hook-form'
import './TextInput.styles.scss'

type TextInputProps<T extends FieldValues = FieldValues> = {
    name: Path<T>
    control: Control<T>
    label?: string
    placeholder?: string
    disabled?: boolean
    required?: boolean
}

export const TextInput = <T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    placeholder,
    disabled,
    required,
}: TextInputProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field }) => (
            <>
                <label htmlFor="solution">{label}</label>
                <input
                    {...field}
                    className="TextInput"
                    type="text"
                    placeholder={placeholder || 'Solution Character'}
                    disabled={disabled}
                    required={required}
                />
            </>
        )}
    />
)
