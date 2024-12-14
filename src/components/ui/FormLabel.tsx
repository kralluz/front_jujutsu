import React from "react";

export interface FormLabelProps {
    htmlFor?: string;
    children: React.ReactNode;
}

export const FormLabel: React.FC<FormLabelProps> = ({ htmlFor, children }) => {
    return <label htmlFor={htmlFor}>{children}</label>;
};
