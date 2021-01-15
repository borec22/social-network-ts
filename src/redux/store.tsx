/*
import {ActionsDialogsType, dialogsReducer} from './dialogs-reducer';
import {ActionsProfileType, profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';

export type PostType = {
   id: number
   message: string
   likesCount: number
}
export type DialogType = {
   id: number
   name: string
}
export type MessageType = {
   id: number
   message: string
}
export type ProfilePageType = {
   posts: Array<PostType>,
   newPostText: string
}
export type DialogsPageType = {
   dialogs: Array<DialogType>
   messages: Array<MessageType>
   newMessageText: string
}
export type SidebarType = {}
export type StateType = {
   profilePage: ProfilePageType
   dialogsPage: DialogsPageType
   sidebar: SidebarType
}

export type ActionsStoreType =  ActionsProfileType | ActionsDialogsType;


type StoreType = {
   _subscriber: () => void
   _state: StateType
   getState: () => StateType
   subscribe: (observer: () => void) => void
   dispatch: (action: ActionsStoreType) => void
}

export const store: StoreType = {
   _subscriber: () => console.log('subscribe'),
   _state: {
      profilePage: {
         posts: [
            {id: 1, message: 'I love Ukraine.', likesCount: 10},
            {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
         ],
         newPostText: ''
      },
      dialogsPage: {
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
      },
      sidebar: {}
   },
   getState() {
      return this._state;
   },
   subscribe(observer) {
      this._subscriber = observer;
   },
   dispatch(action) {
      this._state.profilePage = profileReducer(this._state.profilePage, action);
      this._state.dialogsPage = dialogsReducer(this._state.dialogsPage, action);
      this._state.sidebar = sidebarReducer(this._state.sidebar, action);

      this._subscriber();
   }
}
*/

export default () => {}
