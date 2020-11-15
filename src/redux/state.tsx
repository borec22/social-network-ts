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
   posts: Array<PostType>
}
export type DialogsPageType = {
   dialogs: Array<DialogType>
   messages: Array<MessageType>
}
export type StateType = {
   profilePage: ProfilePageType
   dialogsPage: DialogsPageType
}

export const state: StateType = {
   profilePage: {
      posts: [
         {id: 1, message: 'I love Ukraine.', likesCount: 10},
         {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ]
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
      ]
   }
}