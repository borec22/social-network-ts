import React from 'react';
import classes from './Dialogs.module.css';
import {Dialog} from './Dialog/Dialog';
import {Message} from './Message/Message';

export const Dialogs = () => {
   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            <Dialog id={1} name='Andriy' />
            <Dialog id={2} name='Serhiy' />
            <Dialog id={3} name='Oleg' />
            <Dialog id={4} name='Lesya' />
            <Dialog id={5} name='Ira' />
         </div>

         <div className={classes.messages}>
            <Message id={1} message='Lorem ipsum dolor sit.'/>
            <Message id={2} message='Lorem ipsum is big dog cat dolor sit.'/>
            <Message id={3} message='Lorem ipsum mouse cat house dolor sit.'/>
         </div>
      </div>
   );
}