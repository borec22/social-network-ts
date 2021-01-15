// import {ActionsType, PostType, ProfilePageType} from './store';

enum ActionsType {
   ADD_POST = 'ADD-POST-PROFILE-PAGE',
   UPDATE_POST_TEXT = 'PROFILE/UPDATE-POST-TEXT',
   SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
}

export type PostType = {
   id: number
   message: string
   likesCount: number
}
type PhotosUserType = {
   small: string | null
   large: string | null
}
type UserContactsType =  {
   facebook: string | null
   website: string | null
   vk: string | null
   twitter: string | null
   instagram: string | null
   youtube: string | null
   github: string | null
   mainLink: string | null
}
export type UserProfileType = {
   aboutMe: string | null,
   contacts: UserContactsType
   lookingForAJob: boolean
   lookingForAJobDescription: string | null
   fullName: string | null
   userId: number
   photos: PhotosUserType
}

type InitialStateType = {
   posts: Array<PostType>
   newPostText: string
   userProfile: UserProfileType | null
}

export type ActionsProfileType = ReturnType<typeof addPostAC> | ReturnType<typeof updatePostTextAC> |
   ReturnType<typeof setUserProfile>;

const initialState: InitialStateType = {
   posts: [
      {id: 1, message: 'I love Ukraine.', likesCount: 10},
      {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
   ],
   newPostText: '',
   userProfile: null
}

export function profileReducer(state: InitialStateType = initialState, action: ActionsProfileType) {
   switch (action.type) {
      case ActionsType.ADD_POST: {
         const newPost = {id: 3, message: state.newPostText, likesCount: 4};

         return {
            ...state,
            posts: [...state.posts, newPost],
            newPostText: '',
         };
      }
      case ActionsType.UPDATE_POST_TEXT: {
         return {...state, newPostText: action.text};
      }
      case ActionsType.SET_USER_PROFILE: {
         return {...state, userProfile: action.payload}
      }
      default: {
         return state;
      }
   }
}

export const addPostAC = () => ({type: ActionsType.ADD_POST}) as const

export const updatePostTextAC = (text: string) => ({type: ActionsType.UPDATE_POST_TEXT, text}) as const
export const setUserProfile = (userData: UserProfileType) => ({type: ActionsType.SET_USER_PROFILE, payload: {...userData}}) as const