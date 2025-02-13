import cn from 'classnames'
import React from 'react'

export default function Input({
    type,
    value,
    className,
    placeholder,
    checked,
    required,
    disabled,
    onChange: onChangeCallback,
}) {
    const onChange = (e) => {
        onChangeCallback(e)
    }

    return (
        <input
            className={cn(
                'rounded-xl pl-2 py-3',
                'focus:outline-none focus-visible:ring-inset',
                'focus-visible:ring-secondary',
                'text-neutral',
                { 'cursor-not-allowed': disabled },
                className,
            )}
            type={type}
            value={value}
            placeholder={placeholder}
            checked={checked}
            required={required}
            disabled={disabled}
            onChange={onChange}
        />
    )
}
