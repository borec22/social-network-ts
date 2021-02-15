import {followAPI, profileAPI, usersAPI} from '../api/api';
import {Dispatch} from 'react';

enum ACTIONS_TYPE {
   FOLLOW = 'FOLLOW-USERS-REDUCER',
   UNFOLLOW = 'UNFOLLOW-USERS-REDUCER',
   SET_USERS = 'SET-USERS-USERS-REDUCER',
   SET_TOTAL_COUNT = 'SET_TOTAL_COUNT_USERS_REDUCER',
   SET_CURRENT_PAGE = 'SET_CURRENT_PAGE_USERS_REDUCER',
   SET_IS_FETCHING = 'USERS/SET_SET_IS_FETCHING',
   SET_FOLLOWING_IN_PROGRESS = 'USERS/SET_FOLLOWING_IN_PROGRESS',
}

export type UserType = {
   id: number
   name: string
   uniqueUrlName: null | string
   status: string
   photos: {
      small: string
      large: string
   }
   followed: boolean
}
type StateType = {
   users: Array<UserType>
   totalCount: number
   pageSize: number
   currentPage: number
   isFetching: boolean
   followingInProgress: Array<number>
}
export type ActionsUsersReducersTypes =
   ReturnType<typeof followUser> | ReturnType<typeof unFollowUser> | ReturnType<typeof setUsers> |
   ReturnType<typeof setTotalCount> | ReturnType<typeof setCurrentPage> | ReturnType<typeof setIsFetching> |
   ReturnType<typeof setFollowingInProgress>;

const initialState: StateType = {
   users: [],
   totalCount: 0,
   pageSize: 5,
   currentPage: 1,
   isFetching: false,
   followingInProgress: []
}

export const usersReducer = (state = initialState, action: ActionsUsersReducersTypes): StateType => {
   switch (action.type) {
      case ACTIONS_TYPE.FOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user)
         }
      }
      case ACTIONS_TYPE.UNFOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, followed: false} : user)
         }
      }
      case ACTIONS_TYPE.SET_USERS: {
         return {...state, users: action.users}
      }
      case ACTIONS_TYPE.SET_TOTAL_COUNT: {
         return {...state, ...action.payload}
      }
      case ACTIONS_TYPE.SET_CURRENT_PAGE: {
         return {...state, ...action.payload}
      }
      case ACTIONS_TYPE.SET_IS_FETCHING: {
         return {...state, ...action.payload}
      }
      case ACTIONS_TYPE.SET_FOLLOWING_IN_PROGRESS: {
         let id = action.payload.id;
         let arrayUsersId = state.followingInProgress;
         return {
            ...state,
            followingInProgress: action.payload.isFetching ?
               [...arrayUsersId, id] :
               arrayUsersId.filter(usersId => usersId !== id)
         }
      }
      default: {
         return state;
      }
   }
}

export const followUser = (userId: number) => ({type: ACTIONS_TYPE.FOLLOW, userId}) as const;
export const unFollowUser = (userId: number) => ({type: ACTIONS_TYPE.UNFOLLOW, userId}) as const;
export const setUsers = (users: Array<UserType>) => ({type: ACTIONS_TYPE.SET_USERS, users}) as const;
export const setTotalCount = (totalCount: number) => ({type: ACTIONS_TYPE.SET_TOTAL_COUNT, payload: {totalCount}}) as const;
export const setCurrentPage = (currentPage: number) => ({type: ACTIONS_TYPE.SET_CURRENT_PAGE, payload: {currentPage}}) as const;
export const setIsFetching = (isFetching: boolean) => ({type: ACTIONS_TYPE.SET_IS_FETCHING, payload: {isFetching}}) as const;
export const setFollowingInProgress = (isFetching: boolean, id: number) =>
   ({type: ACTIONS_TYPE.SET_FOLLOWING_IN_PROGRESS, payload: {id, isFetching}}) as const;

export const getUsers = (currentPage: number, pageSize: number) => (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
   dispatch(setIsFetching(true));

   usersAPI.getUsers(currentPage, pageSize)
      .then(data => {
         dispatch(setUsers(data.items));
         dispatch(setTotalCount(data.totalCount));
         dispatch(setIsFetching(false));
      })
}

export const follow = (userId: number) => {
   return (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
      dispatch(setFollowingInProgress(true, userId));
      followAPI.follow(userId)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(followUser(userId));
               dispatch(setFollowingInProgress(false, userId));
            }
         })
   }
}

export const unFollow = (userId: number) => {
   return (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
      dispatch(setFollowingInProgress(true, userId));
      followAPI.unFollow(userId)
         .then(data => {
            if (data.resultCode === 0) {
               dispatch(unFollowUser(userId));
               dispatch(setFollowingInProgress(false, userId));
            }
         })
   }
}
