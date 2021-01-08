export type UserType = {
   id: number
   fullName: string
   status: string
   location: { country: string, city: string }
   photoUrl: string
   isFollowed: boolean
}
type StateType = {
   users: Array<UserType>
}
type ActionsType = ReturnType<typeof follow> | ReturnType<typeof unFollow> | ReturnType<typeof setUsers>;

const FOLLOW = 'FOLLOW-USERS-REDUCER';
const UNFOLLOW = 'UNFOLLOW-USERS-REDUCER';
const SET_USERS = 'SET-USERS-USERS-REDUCER';

const initialState: StateType = {
   users: []
}

export const usersReducer = (state = initialState, action: ActionsType): StateType => {
   switch (action.type) {
      case FOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, isFollowed: true} : user)
         }
      }
      case UNFOLLOW: {
         return {
            ...state,
            users: state.users.map(user => user.id === action.userId ? {...user, isFollowed: false} : user)
         }
      }
      case SET_USERS: {
         return {...state, users: action.users}
      }
      default: {
         return state;
      }
   }
}

export const follow = (userId: number) => ({type: FOLLOW, userId}) as const;
export const unFollow = (userId: number) => ({type: UNFOLLOW, userId}) as const;
export const setUsers = (users: Array<UserType>) => ({type: SET_USERS, users}) as const;