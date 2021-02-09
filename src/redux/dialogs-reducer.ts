import {DialogType, MessageType} from '../components/Dialogs/Dialogs';

const SEND_MESSAGE = 'SEND-MESSAGE-DIALOGS-PAGE';

export type ActionsDialogsType = ReturnType<typeof sendMessage>;

type InitialStateType = {
   dialogs: Array<DialogType>
   messages: Array<MessageType>
}

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

export function dialogsReducer(state: InitialStateType = initialState, action: ActionsDialogsType) {
   switch (action.type) {
      case SEND_MESSAGE: {
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

export const sendMessage = (message: string) => ({type: SEND_MESSAGE, payload: {message}}) as const