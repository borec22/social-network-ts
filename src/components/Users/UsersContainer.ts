import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {follow, getUsers, setCurrentPage, setFollowingInProgress, unFollow} from '../../redux/users-reducer';
import {Users} from './Users';
import {compose} from 'redux';
import React from 'react';

const mapStateToProps = (state: StateType) => ({
   users: state.usersPage.users,
   pageSize: state.usersPage.pageSize,
   currentPage: state.usersPage.currentPage,
   totalCount: state.usersPage.totalCount,
   isFetching: state.usersPage.isFetching,
   followingInProgress: state.usersPage.followingInProgress,
})

export default compose<React.ComponentType>(
   connect(mapStateToProps, {follow, unFollow, setCurrentPage, setFollowingInProgress, getUsers})
)(Users);