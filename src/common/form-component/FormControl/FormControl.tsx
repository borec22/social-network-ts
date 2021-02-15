import React, {useEffect} from "react";
import classes from './FormControl.module.css';

import { FieldRenderProps } from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../../redux/redux-store";
import {setLoginSummaryError} from "../../../redux/auth-reducer";

type Props = FieldRenderProps<string, any>;

const FormControl = (props: Props) => {
    const {input, meta, children} = props;

    const dispatch = useDispatch();

    const isSummaryError = useSelector<StateType, boolean>(state => state.auth.isSummaryError);

    useEffect(() => {
        if (isSummaryError && input.value.length) {
            dispatch(setLoginSummaryError(false, ''));
        }
    }, [input.value])

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

