import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {Header} from './Header';
import {auth, logout, setUserData} from '../../redux/auth-reducer';
import {compose} from 'redux';

class HeaderContainer extends React.Component<TProps> {
   constructor(props: TProps) {
      super(props);
   }

   render() {
      return <Header {...this.props}  />
   }
}

type MapStateType = {
   isAuth: boolean
   login: string | null
}

const mapStateToProps = (state: StateType): MapStateType => ({
   login: state.auth.login,
   isAuth: state.auth.isAuth
});

const connector = connect(mapStateToProps, {auth, logout, setUserData});

type TProps = ConnectedProps<typeof connector>;

export default compose<React.ComponentType>(
    connector
)(HeaderContainer);



