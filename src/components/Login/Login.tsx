import React from 'react';
import classes from './Login.module.css';
import {Field, Form} from 'react-final-form';
import {composeValidators, maxLength, required} from "../../utils/validators";
import {TextInput} from "../../common/form-component/FormControl/FormControl";
import {login} from "../../redux/auth-reducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "../../redux/redux-store";
import {Redirect} from "react-router-dom";

type PropsType = {}

type FormDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}


export const Login: React.FC<PropsType> = React.memo((props) => {
    const dispatch = useDispatch();
    const isAuth = useSelector<StateType, boolean>(state => state.auth.isAuth);

    const onSubmitFormHandle = async (values: FormDataType) => {
        console.log(values);

        dispatch(login(values.email, values.password, values.rememberMe));
        // window.alert(JSON.stringify(values, undefined, 2));
    }

    if (isAuth) {
        return <Redirect to='/profile'/>
    }

    return (
        <div className={classes.container}>
            <h3>Login Form</h3>

            <Form
                onSubmit={onSubmitFormHandle}
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
                            <Field name='email'
                                   component={TextInput}
                                   placeholder='email'
                                   validate={required}
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
                                   validate={composeValidators(maxLength(12), required )}
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






