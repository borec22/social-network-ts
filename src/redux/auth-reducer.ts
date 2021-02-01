import {Dispatch} from 'react';
import {authAPI} from '../api/api';

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
type ActionsAuthReducersTypes = ReturnType<typeof setIsFetching> | ReturnType<typeof setUserData> ;

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
         return {...state, isAuth: true, ...action.payload}
      }
      default: {
         return state;
      }
   }
}

export const setIsFetching = (isFetching: boolean) => ({type: ActiosType.SET_IS_FETCHING, payload: {isFetching}}) as const;
export const setUserData = (id: number, email: string, login: string) => ({type: ActiosType.SET_USER_DATA, payload: {id, email, login}}) as const;

export const auth = () => (dispatch: Dispatch<ActionsAuthReducersTypes>) => {
   authAPI.authMe()
      .then((data) => {
         let {id, email, login} = data.data;

         if (data.resultCode === 0) {
            dispatch(setUserData(id, email, login));
         }
      })
}