import { useState } from 'react'
import type { Option } from '../../types'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import './Select.styles.scss'

type SelectProps<T> = {
    options: Option<T>[]
    placeholder?: string
}

export const Select = <T,>({ options, placeholder }: SelectProps<T>) => {
    const [showOptions, setShowOptions] = useState(false)
    const [selectedOption, setSelectedOption] = useState<Option<T>>()
    console.log('Select options:', selectedOption)

    return (
        <div className={'Select' + (showOptions ? ' Select--open' : '')}>
            <input
                type="text"
                placeholder={placeholder || 'Select an option'}
                className="SelectInput SelectInput--open"
                value={selectedOption?.label ?? ''}
                onClick={() => setShowOptions(!showOptions)}
                onBlur={() => setShowOptions(false)}
                readOnly
            />
            <i>{showOptions ? <FaChevronUp /> : <FaChevronDown />}</i>
            {showOptions && (
                <div className="SelectOptions">
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className="SelectOption"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                setSelectedOption(option)
                                setShowOptions(false)
                            }}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
