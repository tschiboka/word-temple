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
    style?: React.CSSProperties
}

export const TextInput = <T extends FieldValues = FieldValues>({
    name,
    control,
    label,
    placeholder,
    disabled = false,
    required = false,
    style,
    ...rest
}: TextInputProps<T>) => (
    <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
            <>
                <div className="LabelInputPair">
                    <label htmlFor="solution">{label}</label>
                    <input
                        {...field}
                        className="TextInput"
                        type="text"
                        placeholder={placeholder || 'Solution Character'}
                        disabled={disabled}
                        required={required}
                        {...rest}
                    />
                </div>
                {fieldState.error && (
                    <div className="ErrorText">
                        <span>{fieldState.error.message}</span>
                    </div>
                )}
            </>
        )}
    />
)
