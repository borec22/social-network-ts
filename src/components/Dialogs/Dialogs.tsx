import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {Redirect} from 'react-router-dom';

export type DialogType = {
   id: number
   name: string
}
export type MessageType = {
   id: number
   message: string
}
type DialogsType = {
   sendMessage: () => void
   updateMessageText: (text: string) => void
   newMessageText: string
   dialogs: DialogType[]
   messages: MessageType[],
   isAuth: boolean
}

export const Dialogs: React.FC<DialogsType> = (props) => {
   let dialogsElements = props.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
   const messagesElements = props.messages.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

   const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      props.updateMessageText(e.currentTarget.value);
   }
   const sendMessageHandler = () => {
      props.sendMessage();
   }
   if (!props.isAuth) {
      return <Redirect to={'/login'}/>
   } else {
      return (
         <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
               {dialogsElements}
            </div>

            <div className={classes.messages}>
               <div>
                  <textarea value={props.newMessageText} onChange={changeHandler} placeholder='Enter message...' />
                  <div>
                     <button onClick={sendMessageHandler}>Send</button>
                  </div>
               </div>
               {messagesElements}
            </div>
         </div>
      );
   }
}