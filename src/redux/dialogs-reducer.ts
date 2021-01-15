import {DialogType, MessageType} from '../components/Dialogs/Dialogs';

const SEND_MESSAGE = 'SEND-MESSAGE-DIALOGS-PAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT-DIALOGS-PAGE';

export type ActionsDialogsType = ReturnType<typeof sendMessageAC> | ReturnType<typeof updateMessageTextAC>;

type InitialStateType = {
   dialogs: Array<DialogType>
   messages: Array<MessageType>
   newMessageText: string
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
   newMessageText: ''
}

export function dialogsReducer(state: InitialStateType = initialState, action: ActionsDialogsType) {
   switch (action.type) {
      case SEND_MESSAGE: {
         const newMessage = {id: 4, message: state.newMessageText};

         return {
            ...state,
            messages: [...state.messages, newMessage],
            newMessageText: '',
         };
      }
      case UPDATE_MESSAGE_TEXT: {
         return {
            ...state,
            newMessageText: action.message,
         };
      }
      default: {
         return state;
      }
   }
}

// Action Creators

export const sendMessageAC = () => ({type: SEND_MESSAGE}) as const

export const updateMessageTextAC = (message: string) => ({type: UPDATE_MESSAGE_TEXT, message}) as const