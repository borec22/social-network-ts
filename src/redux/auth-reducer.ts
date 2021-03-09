import {authAPI, securityAPI} from '../api/api';
import {Dispatch} from "redux";
import {StateType, AppActionType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

enum ActionsType {
    SET_IS_FETCHING = 'AUTH/SET_IS_FETCHING',
    SET_USER_DATA = 'AUTH/SET_USER_DATA',
    SET_LOGIN_SUMMARY_ERROR = 'AUTH/SET_LOGIN_SUMMARY_ERROR',
    SET_CAPTCHA_URL = 'AUTH/SET_CAPTCHA_URL',
}

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isFetching: false as boolean,
    isAuth: false as boolean,
    isSummaryError: false as boolean,
    errorMessage: '',
    captchaUrl: null as string | null
}


export default function authReducer(state = initialState, action: ActionsAuthReducersTypes): InitialStateType {
    switch (action.type) {
        case ActionsType.SET_IS_FETCHING: {
            return {...state, ...action.payload}
        }
        case ActionsType.SET_USER_DATA: {
            return {...state, ...action.payload}
        }
        case ActionsType.SET_LOGIN_SUMMARY_ERROR: {
            return {...state, ...action.payload}
        }
        case ActionsType.SET_CAPTCHA_URL: {
            return {...state, ...action.payload}
        }
        default: {
            return state;
        }
    }
}


// actions
export const setIsFetching = (isFetching: boolean) => ({
    type: ActionsType.SET_IS_FETCHING,
    payload: {isFetching}
}) as const;

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: ActionsType.SET_USER_DATA,
    payload: {id, email, login, isAuth}
}) as const;

export const setLoginSummaryError = (isSummaryError: boolean, errorMessage: string) => ({
    type: ActionsType.SET_LOGIN_SUMMARY_ERROR,
    payload: {isSummaryError, errorMessage}
}) as const;

export const getCaptchaUrlSuccess = (captchaUrl: string | null) => ({
    type: ActionsType.SET_CAPTCHA_URL,
    payload: {captchaUrl}
}) as const;


// thunks
export const auth = () => async (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
    const data = await authAPI.authMe()

    let {id, email, login} = data.data;

    if (data.resultCode === 0) {
        dispatch(setUserData(id, email, login, true));
    }
}

export const login = (login: string, password: string, rememberMe: boolean, captcha?: string): ThunkAction<void, StateType, unknown, AppActionType> =>
    async (dispatch: ThunkDispatch<StateType, unknown, AppActionType>) => {

        const data = await authAPI.login(login, password, rememberMe, captcha);

        if (data.resultCode === 0) {
            dispatch(auth());
        } else {
            if (data.resultCode === 10){
                dispatch(getCaptchaUrl());
            }

            if (data.messages.length > 0) {
                dispatch(setLoginSummaryError(true, data.messages[0]));
            }
        }
    }

export const logout = () => async (dispatch: Dispatch) => {
    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
        dispatch(getCaptchaUrlSuccess(null));
    }
}

export const getCaptchaUrl = () => async (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
    const data = await securityAPI.getCaptchaUrl();

    dispatch(getCaptchaUrlSuccess(data.url));
}


// types
export type InitialStateType = typeof initialState;

export type ActionsAuthReducersTypes =
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setUserData>
    | ReturnType<typeof setLoginSummaryError>
    | ReturnType<typeof getCaptchaUrlSuccess>;