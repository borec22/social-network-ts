import {ActionsType, PostType, ProfilePageType} from './store';

const ADD_POST = 'ADD-POST-PROFILE-PAGE';
const UPDATE_POST_TEXT = 'UPDATE-POST-TEXT-PROFILE-PAGE';

export type ActionsProfileType = ReturnType<typeof addPostAC> | ReturnType<typeof updatePostTextAC>;

type InitialStateType = {
   posts: Array<PostType>,
   newPostText: string
}

const initialState: InitialStateType = {
   posts: [
      {id: 1, message: 'I love Ukraine.', likesCount: 10},
      {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
   ],
   newPostText: ''
}

export function profileReducer(state: ProfilePageType = initialState, action: ActionsType) {
   switch (action.type) {
      case ADD_POST: {
         const newPost = {id: 3, message: state.newPostText, likesCount: 4};

         return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: '',
         };
      }
      case UPDATE_POST_TEXT: {
         return {...state, newPostText: action.text};
      }
      default: {
         return state;
      }
   }
}

export const addPostAC = () => ({type: ADD_POST}) as const

export const updatePostTextAC = (text: string) => ({type: UPDATE_POST_TEXT, text}) as const