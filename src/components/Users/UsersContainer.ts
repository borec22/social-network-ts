import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {follow, requestUsers, setFollowingInProgress, setPage, unFollow} from '../../redux/users-reducer';
import {Users} from './Users';
import {compose} from 'redux';
import React from 'react';
import {
   getCurrentPage,
   getFollowingInProgress,
   getIsFetching,
   getPageSize,
   getTotalCount,
   getUsers
} from "../../redux/users-selectors";

const mapStateToProps = (state: StateType) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      page: getCurrentPage(state),
      totalCount: getTotalCount(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
   }
}

export default compose<React.ComponentType>(
   connect(mapStateToProps, {follow, unFollow, setPage, setFollowingInProgress, requestUsers})
)(Users);