const FOLLOW = 'FOLLOW-USERS-REDUCER';
const UNFOLLOW = 'UNFOLLOW-USERS-REDUCER';
const SET_USERS = 'SET-USERS-USERS-REDUCER';
const SET_TOTAL_COUNT = 'SET_TOTAL_COUNT_USERS_REDUCER';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE_USERS_REDUCER';
const SET_IS_FETCHING = 'USERS/SET_SET_IS_FETCHING';

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
}
type ActionsType = ReturnType<typeof follow> | ReturnType<typeof unFollow> | ReturnType<typeof setUsers> |
   ReturnType<typeof setTotalCount> | ReturnType<typeof setCurrentPage> | ReturnType<typeof setIsFetching>;

const initialState: StateType = {
   users: [],
   totalCount: 0,
   pageSize: 5,
   currentPage: 1,
   isFetching: false,
}

export const usersReducer = (state = initialState, action: ActionsType): StateType => {
   switch (action.type) {
      case FOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, followed: true} : user)
         }
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, followed: false} : user)
         }
      }
      case SET_USERS: {
         return {...state, users: action.users}
      }
      case SET_TOTAL_COUNT: {
         return {...state, ...action.payload}
      }
      case SET_CURRENT_PAGE: {
         return {...state, ...action.payload}
      }
      case SET_IS_FETCHING: {
         return {...state, ...action.payload}
      }
      default: {
         return state;
      }
   }
}

export const follow = (userId: number) => ({type: FOLLOW, userId}) as const;
export const unFollow = (userId: number) => ({type: UNFOLLOW, userId}) as const;
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const;
export const setTotalCount = (totalCount: number) => ({type: SET_TOTAL_COUNT, payload: {totalCount}}) as const;
export const setCurrentPage = (currentPage: number) => ({type: SET_CURRENT_PAGE, payload: {currentPage}}) as const;
export const setIsFetching = (isFetching: boolean) => ({type: SET_IS_FETCHING, payload: {isFetching}}) as const;