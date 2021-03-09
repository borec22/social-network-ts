import {PhotosDataType, profileAPI} from '../api/api';
import {Dispatch} from "redux";
import {AppActionType, StateType} from "./redux-store";
import {ThunkAction, ThunkDispatch} from "redux-thunk";

enum ACTIONS_TYPE {
    ADD_POST = 'PROFILE/ADD-POST-PROFILE-PAGE',
    SET_USER_PROFILE = 'PROFILE/SET_USER_PROFILE',
    SET_PROFILE_STATUS = 'PROFILE/SET_PROFILE_STATUS',
    SAVE_PHOTO_SUCCESS = 'PROFILE/SAVE_PHOTO_SUCCESS',
    UPDATE_PROFILE_SUCCESS = 'PROFILE/UPDATE_PROFILE_SUCCESS',
    SET_ERROR = 'PROFILE/SET_ERROR',
}

export const initialState = {
    posts: [
        {id: 1, text: 'I love Ukraine.', likesCount: 10},
        {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
    ] as Array<PostType>,
    userProfileData: null as UserProfileType | null,
    status: null as string | null,
    isUpdateProfileSuccess: false as boolean,
    error: null as string | null,
}


export default function profileReducer(state: ProfileReducerInitialStateType = initialState, action: ActionsProfileType): ProfileReducerInitialStateType {
    switch (action.type) {
        case ACTIONS_TYPE.ADD_POST: {
            const newPost = {id: 3, likesCount: 4, ...action.payload};

            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case ACTIONS_TYPE.SET_USER_PROFILE: {
            return {...state, userProfileData: action.payload}
        }
        case ACTIONS_TYPE.SET_PROFILE_STATUS: {
            return {...state, ...action.payload}
        }
        case ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS: {
            return {...state, ...action.payload}
        }
        case ACTIONS_TYPE.SET_ERROR: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
}


// actions
export const addPost = (text: string) => ({type: ACTIONS_TYPE.ADD_POST, payload: {text}}) as const

export const setUserProfileData = (userData: UserProfileType) =>
    ({type: ACTIONS_TYPE.SET_USER_PROFILE, payload: {...userData}}) as const

export const setProfileStatus = (status: string) =>
    ({type: ACTIONS_TYPE.SET_PROFILE_STATUS, payload: {status}}) as const

export const savePhotoSuccess = (photos: PhotosDataType) =>
    ({type: ACTIONS_TYPE.SAVE_PHOTO_SUCCESS, payload: {...photos}} as const);

export const setUpdateProfileSuccess = (isUpdateProfileSuccess: boolean) => ({
    type: ACTIONS_TYPE.UPDATE_PROFILE_SUCCESS,
    payload: {isUpdateProfileSuccess}
} as const);

export const setProfileError = (error: null | string) =>
    ({type: ACTIONS_TYPE.SET_ERROR, payload: {error}} as const);


// thunks
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

export const savePhoto = (photo: File) => async (dispatch: Dispatch<ActionsProfileType>) => {

    const data = await profileAPI.updatePhoto(photo);

    if (data.resultCode === 0) {
        dispatch(savePhotoSuccess(data.data));
        dispatch(setUpdateProfileSuccess(true));
    }
};

export const updateProfile = (domainModel: UpdateDomainProfileModelType): ThunkAction<void, StateType, unknown, ActionsProfileType> =>

    (dispatch: ThunkDispatch<StateType, unknown, ActionsProfileType>, getState: () => StateType) => {
        const userId = getState().auth.id?.toString();
        const profile = getState().profilePage.userProfileData;
        const {contacts, ...domainModelWithoutContacts} = domainModel;

        let data = null;

        if (profile) {
            profileAPI.updateProfile({
                userId: profile.userId,
                aboutMe: profile.aboutMe,
                fullName: profile.fullName,
                lookingForAJob: profile.lookingForAJob,
                lookingForAJobDescription: profile.lookingForAJobDescription,
                contacts: {
                    facebook: profile.contacts.facebook,
                    github: profile.contacts.github,
                    instagram: profile.contacts.instagram,
                    mainLink: profile.contacts.mainLink,
                    twitter: profile.contacts.twitter,
                    vk: profile.contacts.vk,
                    website: profile.contacts.website,
                    youtube: profile.contacts.youtube,
                    ...domainModel.contacts
                },
                ...domainModelWithoutContacts
            })
                .then((data) => {
                    if (data.resultCode === 0) {
                        if (userId) {
                            dispatch(getProfile(userId));
                        }
                        dispatch(setUpdateProfileSuccess(true));
                    } else {
                        if (data.messages.length) {
                            dispatch(setProfileError(data.messages[0]));
                        } else {
                            dispatch(setProfileError('Some error occurred'));
                        }
                    }
                })
        }
    };


// types
export type UpdateDomainProfileModelType = {
    "lookingForAJob"?: boolean,
    "lookingForAJobDescription"?: string | null
    "fullName"?: string,
    "aboutMe"?: string | null
    "contacts": {
        "facebook"?: string | null
        "website"?: string | null
        "vk"?: string | null
        "twitter"?: string | null
        "instagram"?: string | null
        "youtube"?: string | null
        "github"?: string | null
        "mainLink"?: string | null
    }
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

export type ProfileReducerInitialStateType = typeof initialState;

export type ActionsProfileType =
    | ReturnType<typeof addPost>
    | ReturnType<typeof setUserProfileData>
    | ReturnType<typeof setProfileStatus>
    | ReturnType<typeof savePhotoSuccess>
    | ReturnType<typeof setUpdateProfileSuccess>
    | ReturnType<typeof setProfileError>;
