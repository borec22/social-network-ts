import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {getProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';

type ProfileType = {}

/*export const ProfileContainer: React.FC<ProfileType> = (props) => {
   return (

   );
}*/

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfile,
})
export const ProfileContainer = withAuthRedirect(connect(mapStateToProps, {getProfile})(withRouter(Profile)));

