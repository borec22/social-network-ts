import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogType, MessageType} from '../../index';

type DialogsType = {
   dialogsData: Array<DialogType>
   messagesData: Array<MessageType>
}

export const Dialogs: React.FC<DialogsType> = (props) => {
   let dialogsElements = props.dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
   const messageselements = props.messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            {dialogsElements}
         </div>

         <div className={classes.messages}>
            {messageselements}
         </div>
      </div>
   );
}