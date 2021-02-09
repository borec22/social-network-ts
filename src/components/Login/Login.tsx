import React from 'react';
import classes from './Login.module.css';
import {Field, Form} from 'react-final-form';
import {composeValidators, maxLength, required} from "../../utils/validators";
import {TextInput} from "../../common/form-component/FormControl/FormControl";

type PropsType = {}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const showResults = async (values: any) => {
    await sleep(1000);
    window.alert(JSON.stringify(values, undefined, 2));
}

export const Login: React.FC<PropsType> = React.memo((props) => {
    return (
        <div className={classes.container}>
            <h3>Login Form</h3>

            <Form
                onSubmit={showResults}
                subscription={{
                    submitting: true,
                }}
                render={(props) => {
                    const {handleSubmit, submitting, form} = props;

                    return (
                        <form onSubmit={ async (event) => {
                            await handleSubmit(event);
                            form.reset();
                        }}>
                            <Field name='login'
                                   component={TextInput}
                                   placeholder='login'
                                   validate={composeValidators(maxLength(8), required )}
                                   subscription={{
                                       value: true,
                                       error: true,
                                       touched: true
                                   }}
                            />
                            <Field name='password'
                                   type='password'
                                   component={TextInput}
                                   placeholder='password'
                                   validate={required}
                                   subscription={{
                                       value: true,
                                       error: true,
                                       touched: true
                                   }}
                            />
                            <div>
                                <Field name='rememberMe'
                                       type='checkbox'
                                       component='input'
                                /> Remember me
                            </div>
                            <button type="submit" disabled={submitting}>submit</button>
                        </form>
                    )
                }}
            />
        </div>
    );
});






