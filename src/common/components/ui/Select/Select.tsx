import { useState } from 'react'
import type { Option } from '../../types'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './Select.styles.scss'
import { Controller, type Control } from 'react-hook-form'

type SelectProps<T> = {
    name: string
    options: Option<T>[]
    label?: string
    placeholder?: string
    control: Control<any>
}

export const Select = <T,>({
    name,
    options,
    label,
    placeholder,
    control,
}: SelectProps<T>) => {
    const [showOptions, setShowOptions] = useState(false)

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => {
                const selectedOption = options.find(
                    (option) => option.value === field.value,
                )
                return (
                    <>
                        <div className="LabelInputPair">
                            {label && <label htmlFor="role">{label}</label>}
                            <div
                                className={
                                    'Select' +
                                    (showOptions ? ' Select--open' : '')
                                }
                            >
                                <input
                                    type="text"
                                    placeholder={
                                        placeholder || 'Select an option'
                                    }
                                    className="SelectInput SelectInput--open"
                                    value={selectedOption?.label ?? ''}
                                    onClick={() => setShowOptions(!showOptions)}
                                    onBlur={() => setShowOptions(false)}
                                    readOnly
                                />
                                <i>
                                    {showOptions ? (
                                        <FaChevronUp />
                                    ) : (
                                        <FaChevronDown />
                                    )}
                                </i>
                                {showOptions && (
                                    <div className="SelectOptions">
                                        {options.map((option, index) => (
                                            <div
                                                key={index}
                                                className="SelectOption"
                                                onMouseDown={(e) =>
                                                    e.preventDefault()
                                                }
                                                onClick={() => {
                                                    field.onChange(option.value)
                                                    setShowOptions(false)
                                                }}
                                            >
                                                {option.label}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                        {fieldState.error && (
                            <div className="ErrorText">
                                <span>{fieldState.error.message}</span>
                            </div>
                        )}
                    </>
                )
            }}
        />
    )
}
