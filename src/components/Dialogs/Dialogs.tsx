import React, {ChangeEvent} from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {ActionsType, DialogsPageType, sendMessageAC, updateMessageTextAC} from '../../redux/store';

type DialogsType = {
   dialogsPage: DialogsPageType
   dispatch: (action: ActionsType) => void
   newMessageText: string
}

export const Dialogs: React.FC<DialogsType> = (props) => {
   let dialogsElements = props.dialogsPage.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
   const messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

   const changeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
      props.dispatch(updateMessageTextAC(e.currentTarget.value));
   }
   const sendMessageHandler = () => {
      props.dispatch(sendMessageAC());
   }

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