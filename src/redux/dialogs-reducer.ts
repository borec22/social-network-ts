import {DialogType, MessageType} from '../components/Dialogs/Dialogs';

enum  ACTIONS_TYPE {
   SEND_MESSAGE = 'SEND-MESSAGE-DIALOGS-PAGE',
}

type InitialStateType = {
   dialogs: Array<DialogType>
   messages: Array<MessageType>
}

export type ActionsDialogsType = ReturnType<typeof sendMessage>;


const initialState: InitialStateType = {
   dialogs: [
      {id: 1, name: 'Andriy'},
      {id: 2, name: 'Serhiy'},
      {id: 3, name: 'Oleg'},
      {id: 4, name: 'Lesya'},
      {id: 5, name: 'Ira'},
   ],
   messages: [
      {id: 1, message: 'Lorem ipsum dolor sit.'},
      {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.'},
      {id: 3, message: 'Lorem ipsum mouse cat house dolor sit.'},
   ],
}

export default function dialogsReducer(state: InitialStateType = initialState, action: ActionsDialogsType) {
   switch (action.type) {
      case ACTIONS_TYPE.SEND_MESSAGE: {
         const newMessage = {id: 4, ...action.payload};

         return {
            ...state,
            messages: [...state.messages, newMessage],
            newMessageText: '',
         };
      }
      default: {
         return state;
      }
   }
}


export const sendMessage = (message: string) => ({type: ACTIONS_TYPE.SEND_MESSAGE, payload: {message}}) as const