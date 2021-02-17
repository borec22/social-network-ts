import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {Field, Form} from 'react-final-form';
import {Textarea} from "../../common/form-component/FormControl/FormControl";
import {required} from "../../utils/validators";

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


export const Dialogs: React.FC<DialogsType> = React.memo(({dialogs, messages, sendMessage}) => {
    let dialogsElements = dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
    const messagesElements = messages.map(message => <Message key={message.id} id={message.id}
                                                                    message={message.message}/>)

    const onSubmitHandler = (values: ValuesType) => {
        sendMessage(values.message);
    }

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>

            <div className={classes.messages}>
                <Form
                    onSubmit={onSubmitHandler}
                    subscription={{
                        submitting: true
                    }}
                    render={({handleSubmit, submitting, values, form}) => {

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
});