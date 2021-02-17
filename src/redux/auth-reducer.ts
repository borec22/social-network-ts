import {authAPI} from '../api/api';
import {Dispatch} from "redux";
import {StateType, AppActionType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

enum ActionsType {
    SET_IS_FETCHING = 'AUTH/SET_IS_FETCHING',
    SET_USER_DATA = 'AUTH/SET_USER_DATA',
    SET_LOGIN_SUMMARY_ERROR = 'AUTH/SET_LOGIN_SUMMARY_ERROR',
}

export type InitialAuthStateType = {
    id: number | null
    email: string | null
    login: string | null
    isFetching: boolean
    isAuth: boolean
    isSummaryError: boolean
    errorMessage: string

}

const initialState: InitialAuthStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    isSummaryError: false,
    errorMessage: ''
}

export type ActionsAuthReducersTypes = ReturnType<typeof setIsFetching> | ReturnType<typeof setUserData> |
    ReturnType<typeof setLoginSummaryError>;


export default function authReducer(state = initialState, action: ActionsAuthReducersTypes): InitialAuthStateType {
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
        default: {
            return state;
        }
    }
}


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


export const auth = () => async (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
    const data = await authAPI.authMe()

    let {id, email, login} = data.data;

    if (data.resultCode === 0) {
        dispatch(setUserData(id, email, login, true));
    }
}

export const login = (login: string, password: string, rememberMe: boolean): ThunkAction<void, StateType, unknown, AppActionType> =>
    async (dispatch: ThunkDispatch<StateType, unknown, AppActionType>) => {

        const data = await authAPI.login(login, password, rememberMe);

        if (data.resultCode === 0) {
            dispatch(auth());
        } else {
            if (data.messages.length > 0) {
                dispatch(setLoginSummaryError(true, data.messages[0]))
            }
        }
    }

export const logout = () => async (dispatch: Dispatch) => {
    const data = await authAPI.logout()

    if (data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    }
}