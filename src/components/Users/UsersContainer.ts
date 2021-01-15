import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {
   follow,
   setCurrentPage,
   setIsFetching,
   setTotalCount,
   setUsers,
   unFollow,
   UserType
} from '../../redux/users-reducer';
import {Users} from './Users';

const mapStateToProps = (state: StateType) => ({
   users: state.usersPage.users,
   totalCount: state.usersPage.totalCount,
   pageSize: state.usersPage.pageSize,
   currentPage: state.usersPage.currentPage,
   isFetching: state.usersPage.isFetching,
})

const mapDispatchToProps = (dispatch: any) => ({
   follow: (userId: number) => dispatch(follow(userId)),
   unFollow: (userId: number) => dispatch(unFollow(userId)),
   setUsers: (users: Array<UserType>) => dispatch(setUsers(users)),
   setTotalCount: (totalCount: number) => dispatch(setTotalCount(totalCount)),
   setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
   setIsFetching: (isFetching: boolean) => dispatch(setIsFetching(isFetching)),
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);