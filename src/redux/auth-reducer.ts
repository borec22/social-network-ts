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
export type ActionsAuthReducersTypes = ReturnType<typeof setIsFetching> | ReturnType<typeof setUserData> |
    ReturnType<typeof setLoginSummaryError>;

const initialState: InitialAuthStateType = {
    id: null,
    email: null,
    login: null,
    isFetching: false,
    isAuth: false,
    isSummaryError: false,
    errorMessage: ''
}


export const authReducer = (state = initialState, action: ActionsAuthReducersTypes): InitialAuthStateType => {
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

export const setLoginSummaryError = (isSummaryError: boolean, errorMessage: string) => ({type: ActionsType.SET_LOGIN_SUMMARY_ERROR, payload: {isSummaryError, errorMessage}}) as const;


export const auth = () => (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
    return authAPI.authMe()
        .then((data) => {
            let {id, email, login} = data.data;

            if (data.resultCode === 0) {
                dispatch(setUserData(id, email, login, true));
            }
        })
}


export const login = (login: string, password: string, rememberMe: boolean): ThunkAction<void, StateType, unknown, AppActionType> =>
    (dispatch: ThunkDispatch<StateType, unknown, AppActionType>) => {

        authAPI.login(login, password, rememberMe)
            .then(data => {
                if (data.resultCode === 0) {
                    dispatch(auth());
                } else {
                    if (data.messages.length > 0) {
                        dispatch(setLoginSummaryError(true, data.messages[0]))
                    }
                }
            })
    }

export const logout = () => (dispatch: Dispatch) => {
    authAPI.logout()
        .then(data => {
            if (data.resultCode === 0) {
                dispatch(setUserData(null, null, null, false));
            }
        })
}