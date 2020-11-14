import React from 'react';
import classes from './Message.module.css';

type MessageTypes = {
   id: number
   message: string
}
export const Message: React.FC<MessageTypes> = (props) => {
   return (
      <div className={classes.message}>
         {props.message}
      </div>
   );
}