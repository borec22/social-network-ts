import React from 'react';
import {sendMessageAC, updateMessageTextAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';

type DialogsType = {
   store: any
}

export const DialogsContainer: React.FC<DialogsType> = (props) => {
   const state = props.store.getState();

   const changeMessageText = (text: string) => {
      props.store.dispatch(updateMessageTextAC(text));
   }
   const sendMessage = () => {
      props.store.dispatch(sendMessageAC());
   }

   return <Dialogs sendMessage={sendMessage}
                   changeMessageText={changeMessageText}
                   newMessageText={state.dialogsPage.newMessageText}
                   dialogs={state.dialogsPage.dialogs}
                   messages={state.dialogsPage.messages}/>
}