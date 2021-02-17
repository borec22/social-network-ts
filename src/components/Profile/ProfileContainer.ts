import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {getProfile, getStatus, updateProfileStatus} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfileData,
   status: state.profilePage.status,
   authenticationId: state.auth.id
})

export default compose<React.ComponentType>(
   withRouter,
   connect(mapStateToProps, {getProfile, getStatus, updateProfileStatus})
)(Profile);


