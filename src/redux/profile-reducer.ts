// import {ActionsType, PostType, ProfilePageType} from './store';

import {Dispatch} from 'react';
import {profileAPI} from '../api/api';

enum ActionsType {
   ADD_POST = 'ADD-POST-PROFILE-PAGE',
   SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
   SET_PROFILE_STATUS = 'PROFILE/SET_PROFILE_STATUS'
}

export type PostType = {
   id: number
   text: string
   likesCount: number
}
type PhotosUserType = {
   small: string | null
   large: string | null
}
type UserContactsType = {
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
   userProfile: UserProfileType | null
   status: null | string
}

export type ActionsProfileType = ReturnType<typeof addPost> |
   ReturnType<typeof setUserProfile> | ReturnType<typeof setProfileStatus>;

const initialState: InitialStateType = {
   posts: [
      {id: 1, text: 'I love Ukraine.', likesCount: 10},
      {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
   ],
   userProfile: null,
   status: null
}

export function profileReducer(state: InitialStateType = initialState, action: ActionsProfileType): InitialStateType {
   switch (action.type) {
      case ActionsType.ADD_POST: {
         const newPost = {id: 3, likesCount: 4, ...action.payload};

         return {
            ...state,
            posts: [...state.posts, newPost],
         };
      }
      case ActionsType.SET_USER_PROFILE: {
         return {...state, userProfile: action.payload}
      }
      case ActionsType.SET_PROFILE_STATUS: {
         return {...state, ...action.payload}
      }
      default: {
         return state;
      }
   }
}

export const addPost = (text: string) => ({type: ActionsType.ADD_POST, payload: {text}}) as const

export const setUserProfile = (userData: UserProfileType) =>
   ({type: ActionsType.SET_USER_PROFILE, payload: {...userData}}) as const
export const setProfileStatus = (status: string) =>
   ({type: ActionsType.SET_PROFILE_STATUS, payload: {status}}) as const


export const getProfile = (userId: string) => (dispatch: Dispatch<ActionsProfileType>) => {
   profileAPI.getUserProfile(userId)
      .then(data => {
         dispatch(setUserProfile(data));
      });
}

export const getStatus = (userId: string) => (dispatch: Dispatch<ActionsProfileType>) => {
   profileAPI.getProfileStatus(userId)
      .then((response) => {
         dispatch(setProfileStatus(response.data));
      })
}

export const updateProfileStatus = (status: string) => (dispatch: Dispatch<ActionsProfileType>) => {
   profileAPI.updateProfileStatus(status)
      .then((data) => {
         if (data.resultCode === 0) {
            dispatch(setProfileStatus(status));
         }
      })

}