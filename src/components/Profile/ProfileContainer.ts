import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {setUserProfile} from '../../redux/profile-reducer';

type ProfileType = {}

/*export const ProfileContainer: React.FC<ProfileType> = (props) => {
   return (

   );
}*/

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfile
})
export const ProfileContainer = connect(mapStateToProps, {setUserProfile})(Profile);

