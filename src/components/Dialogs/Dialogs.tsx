import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';
import {DialogsPageType} from '../../redux/state';

type DialogsType = {
   dialogsPage: DialogsPageType
}

export const Dialogs: React.FC<DialogsType> = (props) => {
   let dialogsElements = props.dialogsPage.dialogs.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
   const messagesElements = props.dialogsPage.messages.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            {dialogsElements}
         </div>

         <div className={classes.messages}>
            {messagesElements}
         </div>
      </div>
   );
}