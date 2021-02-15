import {authAPI} from '../api/api';
import {Dispatch} from "redux";
import {StateType, AppActionType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';

enum ActiosType {
   SET_IS_FETCHING = 'AUTH/SET_IS_FETCHING',
   SET_USER_DATA = 'AUTH/SET_USER_DATA',
}

type InitialStateType = {
   id: number | null
   email: string | null
   login: string | null
   isFetching: boolean
   isAuth: boolean
}
export type ActionsAuthReducersTypes = ReturnType<typeof setIsFetching> | ReturnType<typeof setUserData> ;

const initialState: InitialStateType = {
   id: null,
   email: null,
   login: null,
   isFetching: false,
   isAuth: false
}


export const authReducer = (state = initialState, action: ActionsAuthReducersTypes): InitialStateType => {
   switch (action.type) {

      case ActiosType.SET_IS_FETCHING: {
         return {...state, ...action.payload}
      }
      case ActiosType.SET_USER_DATA: {
         return {...state, ...action.payload}
      }
      default: {
         return state;
      }
   }
}


export const setIsFetching = (isFetching: boolean) => ({type: ActiosType.SET_IS_FETCHING, payload: {isFetching}}) as const;

export const setUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean) => ({type: ActiosType.SET_USER_DATA, payload: {id, email, login, isAuth}}) as const;


export const auth = () => (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
   authAPI.authMe()
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