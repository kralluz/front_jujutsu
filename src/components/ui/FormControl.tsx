import React, { ReactNode } from "react";

export interface FormControlProps {
    id?: string;
    isRequired?: boolean;
    isInvalid?: boolean;
    isDisabled?: boolean;
    label?: string;
    helperText?: string;
    errorMessage?: string;
    children: ReactNode;
}

export const FormControl: React.FC<FormControlProps> = ({
    id,
    isRequired = false,
    isInvalid = false,
    isDisabled = false,
    label,
    helperText,
    errorMessage,
    children,
}) => {
    return (
        <div id={id} aria-required={isRequired} aria-invalid={isInvalid} aria-disabled={isDisabled}>
            {label && <label>{label}</label>}
            {children}
            {helperText && !isInvalid && <small>{helperText}</small>}
            {isInvalid && errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
        </div>
    );
};