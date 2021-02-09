import React from "react";
import classes from './FormControl.module.css';

import { FieldRenderProps } from "react-final-form";

type Props = FieldRenderProps<string, any>;

const FormControl = (props: Props) => {
    const {meta, children} = props;

    const hasError = meta.error && meta.touched;

    return (
        <div className={`${hasError ? classes.error : ''}`}>
            <div>
                {children}
            </div>
            {hasError && <span className={classes.error}>{meta.error}</span>}
        </div>
    );
}

export const TextInput: React.FC<Props> = (props: Props) => {
    const { input, meta, ...rest } = props;

    return (
        <FormControl {...props}>
            <input type="text" {...input} {...rest} />
        </FormControl>
    );
};

export const Textarea: React.FC<Props> = (props: Props) => {
    const { input, meta, ...rest } = props;

    return (
        <FormControl {...props}>
            <textarea {...input} {...rest} />
        </FormControl>
    );
};

