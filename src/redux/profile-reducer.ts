import {profileAPI} from '../api/api';
import {Dispatch} from "redux";

enum ActionsType {
    ADD_POST = 'PROFILE/ADD-POST-PROFILE-PAGE',
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

export type ProfileReducerInitialStateType = {
    posts: Array<PostType>
    userProfileData: UserProfileType | null
    status: null | string
}

export const initialState: ProfileReducerInitialStateType = {
    posts: [
        {id: 1, text: 'I love Ukraine.', likesCount: 10},
        {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
    ],
    userProfileData: null,
    status: null
}

export type ActionsProfileType = ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfileData> | ReturnType<typeof setProfileStatus>;


export default function profileReducer(state: ProfileReducerInitialStateType = initialState, action: ActionsProfileType): ProfileReducerInitialStateType {
    switch (action.type) {
        case ActionsType.ADD_POST: {
            const newPost = {id: 3, likesCount: 4, ...action.payload};

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case ActionsType.SET_USER_PROFILE: {
            return {...state, userProfileData: action.payload}
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

export const setUserProfileData = (userData: UserProfileType) =>
    ({type: ActionsType.SET_USER_PROFILE, payload: {...userData}}) as const

export const setProfileStatus = (status: string) =>
    ({type: ActionsType.SET_PROFILE_STATUS, payload: {status}}) as const


export const getProfile = (userId: string) => async (dispatch: Dispatch<ActionsProfileType>) => {
    const data = await profileAPI.getUserProfile(userId);

    dispatch(setUserProfileData(data));
}

export const getStatus = (userId: string) => async (dispatch: Dispatch<ActionsProfileType>) => {
    const data = await profileAPI.getProfileStatus(userId);

    dispatch(setProfileStatus(data.data));
}

export const updateProfileStatus = (status: string) => async (dispatch: Dispatch<ActionsProfileType>) => {
    const data = await profileAPI.updateProfileStatus(status)

    if (data.resultCode === 0) {
        dispatch(setProfileStatus(status));
    }
}
