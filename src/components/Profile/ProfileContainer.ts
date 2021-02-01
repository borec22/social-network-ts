import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {getProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';

type ProfileType = {}

/*export const ProfileContainer: React.FC<ProfileType> = (props) => {
   return (

   );
}*/

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfile,
   isAuth: state.auth.isAuth
})
export const ProfileContainer = connect(mapStateToProps, {getProfile})(withRouter(Profile));

