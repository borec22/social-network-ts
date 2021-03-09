import {followAPI, usersAPI, UserType} from '../api/api';
import {Dispatch} from 'react';
import {updateObjectInArray} from "../utils/objects-helper";

enum ACTIONS_TYPE {
    FOLLOW = 'FOLLOW-USERS-REDUCER',
    UNFOLLOW = 'UNFOLLOW-USERS-REDUCER',
    SET_USERS = 'SET-USERS-USERS-REDUCER',
    SET_TOTAL_COUNT = 'SET_TOTAL_COUNT_USERS_REDUCER',
    SET_CURRENT_PAGE = 'SET_CURRENT_PAGE_USERS_REDUCER',
    SET_IS_FETCHING = 'USERS/SET_SET_IS_FETCHING',
    SET_FOLLOWING_IN_PROGRESS = 'USERS/SET_FOLLOWING_IN_PROGRESS',
}

const initialState = {
    users: [] as UserType[],
    totalCount: 0 as number,
    pageSize: 5 as number,
    page: 1 as number,
    isFetching: false as boolean,
    followingInProgress: [] as Array<number>,
}


export const usersReducer = (state = initialState, action: ActionsUsersReducersTypes): UsersInitialStateType => {
    switch (action.type) {
        case ACTIONS_TYPE.FOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: true})
            }
        }
        case ACTIONS_TYPE.UNFOLLOW: {
            return {
                ...state,
                users: updateObjectInArray(state.users, 'id', action.userId, {followed: false})
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


// actions
export const followSuccess = (userId: number) =>
    ({type: ACTIONS_TYPE.FOLLOW, userId}) as const;

export const unfollowSuccess = (userId: number) =>
    ({type: ACTIONS_TYPE.UNFOLLOW, userId}) as const;

export const setUsers = (users: Array<UserType>) =>
    ({type: ACTIONS_TYPE.SET_USERS, users}) as const;

export const setTotalCount = (totalCount: number) =>
    ({type: ACTIONS_TYPE.SET_TOTAL_COUNT, payload: {totalCount}}) as const;

export const setPage = (page: number) =>
    ({type: ACTIONS_TYPE.SET_CURRENT_PAGE, payload: {page}}) as const;

export const setIsFetching = (isFetching: boolean) =>
    ({type: ACTIONS_TYPE.SET_IS_FETCHING, payload: {isFetching}}) as const;

export const setFollowingInProgress = (isFetching: boolean, id: number) =>
    ({type: ACTIONS_TYPE.SET_FOLLOWING_IN_PROGRESS, payload: {id, isFetching}}) as const;


// thunks
export const requestUsers = (currentPage: number, pageSize: number) => async (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
    dispatch(setIsFetching(true));

    const data = await usersAPI.getUsers(currentPage, pageSize);

    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
    dispatch(setIsFetching(false));

}

const followUnfollowFlow =  async (
    dispatch: Dispatch<ActionsUsersReducersTypes>,
    apiMethod: any,
    actionCreator: any,
    userId: number
) => {
    dispatch(setFollowingInProgress(true, userId));

    const data = await apiMethod;

    if (data.resultCode === 0) {
        dispatch(actionCreator);

        dispatch(setFollowingInProgress(false, userId));
    }
}

export const follow = (userId: number) => async (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
    followUnfollowFlow(dispatch, followAPI.follow(userId), followSuccess(userId), userId);
}

export const unFollow = (userId: number) => async (dispatch: Dispatch<ActionsUsersReducersTypes>) => {
    followUnfollowFlow(dispatch, followAPI.unFollow(userId), unfollowSuccess(userId), userId);
}


// types
export type UsersInitialStateType = typeof initialState;

export type ActionsUsersReducersTypes =
    ReturnType<typeof followSuccess> | ReturnType<typeof unfollowSuccess> | ReturnType<typeof setUsers> |
    ReturnType<typeof setTotalCount> | ReturnType<typeof setPage> | ReturnType<typeof setIsFetching> |
    ReturnType<typeof setFollowingInProgress>;
