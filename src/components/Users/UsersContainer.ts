import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {follow, getUsers, setCurrentPage, setFollowingInProgress, unFollow} from '../../redux/users-reducer';
import {Users} from './Users';

const mapStateToProps = (state: StateType) => ({
   users: state.usersPage.users,
   pageSize: state.usersPage.pageSize,
   currentPage: state.usersPage.currentPage,
   totalCount: state.usersPage.totalCount,
   isFetching: state.usersPage.isFetching,
   followingInProgress: state.usersPage.followingInProgress,
})

export const UsersContainer = connect(mapStateToProps,
   {follow, unFollow, setCurrentPage, setFollowingInProgress, getUsers})(Users);