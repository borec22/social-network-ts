import React from 'react';
import {sendMessageAC, updateMessageTextAC} from '../../redux/dialogs-reducer';
import { StoreContext } from '../../StoreProvider';
import {Dialogs} from './Dialogs';

type DialogsType = {}

export const DialogsContainer: React.FC<DialogsType> = (props) => {

   return <StoreContext.Consumer>
      {store => {

         const state = store.getState();

         const changeMessageText = (text: string) => {
            store.dispatch(updateMessageTextAC(text));
         }
         const sendMessage = () => {
            store.dispatch(sendMessageAC());
         }

         return <Dialogs sendMessage={sendMessage}
                         changeMessageText={changeMessageText}
                         newMessageText={state.dialogsPage.newMessageText}
                         dialogs={state.dialogsPage.dialogs}
                         messages={state.dialogsPage.messages}/>
      }}
   </StoreContext.Consumer>
}