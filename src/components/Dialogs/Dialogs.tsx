import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';

export const Dialogs = () => {

   let dialogsData = [
      {id: 1, name: 'Andriy'},
      {id: 2, name: 'Serhiy'},
      {id: 3, name: 'Oleg'},
      {id: 4, name: 'Lesya'},
      {id: 5, name: 'Ira'},
   ];

   let messagesData = [
      {id: 1, message: 'Lorem ipsum dolor sit.'},
      {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.'},
      {id: 3, message: 'Lorem ipsum mouse cat house dolor sit.'},
   ];

   let dialogs = dialogsData.map(dialog => <Dialog key={dialog.id} id={dialog.id} name={dialog.name}/>);
   const messages = messagesData.map(message => <Message key={message.id} id={message.id} message={message.message}/>)

   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            {dialogs}
         </div>

         <div className={classes.messages}>
            {messages}
         </div>
      </div>
   );
}