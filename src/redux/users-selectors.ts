import {StateType} from "./redux-store";
import {createSelector} from "reselect";

interface IRootState extends StateType {}

export const getUsersSelector = (state: IRootState) => state.usersPage.users;

export const getUsers = createSelector([getUsersSelector], (users) => {
    return users.filter(u => true);
})

export const getPageSize = (state: IRootState) => state.usersPage.pageSize;
export const getCurrentPage = (state: IRootState) => state.usersPage.currentPage;
export const getTotalCount = (state: IRootState) => state.usersPage.totalCount;
export const getIsFetching = (state: IRootState) => state.usersPage.isFetching;
export const getFollowingInProgress = (state: IRootState) => state.usersPage.followingInProgress;