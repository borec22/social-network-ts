import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {Field, Form} from 'react-final-form';
import {Textarea} from "../../common/form-component/FormControl/FormControl";

export type DialogType = {
    id: number
    name: string
}
export type MessageType = {
    id: number
    message: string
}
type DialogsType = {
    sendMessage: (message: string) => void
    dialogs: DialogType[]
    messages: MessageType[]
}
type ValuesType = {
    message: string
}

const required = (value: any) => value ? undefined : 'Required';

export const Dialogs: React.FC<DialogsType> = (props) => {
    let dialogsElements = props.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
    const messagesElements = props.messages.map(message => <Message key={message.id} id={message.id}
                                                                    message={message.message}/>)

    const showResults = (values: ValuesType) => {
        props.sendMessage(values.message);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <Form
                    onSubmit={showResults}
                    subscription={{
                        submitting: true
                    }}
                    render={(props) => {
                        const {handleSubmit, submitting, values, form} = props;
                        return (
                            <form onSubmit={ async event => {
                                await handleSubmit(event);
                                form.reset();
                            }}>
                                <Field name='message'
                                       component={Textarea}
                                       placeholder='Enter your message....'
                                       validate={required}
                                       subscription={{
                                           value: true,
                                           error: true,
                                           touched: true
                                       }}
                                />
                                <div>
                                    <button type='submit' disabled={submitting}>Send</button>
                                </div>
                                <pre>{JSON.stringify(values, undefined, 2)}</pre>
                            </form>
                        )
                    }}
                />
                {messagesElements}
            </div>
        </div>
    );
}