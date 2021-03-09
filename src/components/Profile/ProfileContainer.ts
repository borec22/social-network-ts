import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {
   getProfile,
   getStatus,
   savePhoto, setProfileError,
   setUpdateProfileSuccess,
   updateProfile,
   updateProfileStatus
} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfileData,
   status: state.profilePage.status,
   authenticationId: state.auth.id,
   isUpdateProfileSuccess: state.profilePage.isUpdateProfileSuccess,
   error: state.profilePage.error
})

export default compose<React.ComponentType>(
   withRouter,
   connect(mapStateToProps, {getProfile, getStatus, updateProfileStatus, savePhoto, updateProfile, setUpdateProfileSuccess, setProfileError})
)(Profile);


