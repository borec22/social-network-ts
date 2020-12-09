const ADD_POST = 'ADD-POST-PROFILE-PAGE';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT-PROFILE-PAGE';
const SEND_MESSAGE = 'SEND-MESSAGE-DIALOGS-PAGE';
const UPDATE_MESSAGE_TEXT = 'UPDATE-MESSAGE-TEXT-DIALOGS-PAGE';

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
export type StateType = {
   profilePage: ProfilePageType
   dialogsPage: DialogsPageType
}

type StoreType = {
   _subscriber: () => void
   _state: StateType
   getState: () => StateType
   subscribe: (observer: () => void) => void
   dispatch: (action: ActionsType) => void
}

export type ActionsType = ReturnType<typeof addPostAC> | ReturnType<typeof updatePostTextAC> |
   ReturnType<typeof sendMessageAC> | ReturnType<typeof updateMessageTextAC>;

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
      }
   },
   getState() {
      return this._state;
   },
   subscribe(observer) {
      this._subscriber = observer;
   },
   dispatch(action) {
      switch (action.type) {
         case ADD_POST: {
            const newPost = {id: 3, message: this._state.profilePage.newPostText, likesCount: 4};
            this._state.profilePage.posts.push(newPost);
            this._subscriber();
            this._state.profilePage.newPostText = '';
            return this._state;
         }
         case UPDATE_POST_TEXT: {
            this._state.profilePage.newPostText = action.text;
            this._subscriber();
            return this._state;
         }
         case SEND_MESSAGE: {
            const newMessage = {id: 4, message: this._state.dialogsPage.newMessageText};
            this._state.dialogsPage.messages.push(newMessage);
            this._subscriber();
            this._state.dialogsPage.newMessageText = '';
            return this._state;
         }
         case UPDATE_MESSAGE_TEXT: {
            this._state.dialogsPage.newMessageText = action.message;
            this._subscriber();
            return this._state;
         }
         default: {
            return this._state;
         }
      }
   }
}

// Action Creators
export const addPostAC = () => {
   return {
      type: ADD_POST,
   } as const
}
export const updatePostTextAC = (text: string) => {
   return {
      type: UPDATE_POST_TEXT,
      text,
   } as const
}
export const sendMessageAC = () => {
   return {
      type: SEND_MESSAGE,
   } as const
}
export const updateMessageTextAC = (message: string) => {
   return {
      type: UPDATE_MESSAGE_TEXT,
      message,
   } as const
}