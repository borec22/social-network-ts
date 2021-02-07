import React from 'react';
import {connect} from 'react-redux';
import {Profile} from './Profile';
import {StateType} from '../../redux/redux-store';
import {getProfile} from '../../redux/profile-reducer';
import {withRouter} from 'react-router-dom';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => ({
   userProfile: state.profilePage.userProfile,
})
export default compose<React.ComponentType>(
   withRouter,
   connect(mapStateToProps, {getProfile})
)(Profile);


