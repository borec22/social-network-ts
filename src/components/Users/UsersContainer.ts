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

export const UsersContainer = connect(mapStateToProps,
   {follow, unFollow, setUsers, setTotalCount, setCurrentPage, setIsFetching})(Users);