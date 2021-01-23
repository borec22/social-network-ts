import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {Header} from './Header';
import axios from 'axios';
import {setUserData} from '../../redux/auth-reducer';
import {authAPI} from '../../api/api';

class HeaderContainer extends React.Component<TProps> {
   constructor(props: TProps) {
      super(props)
   }

   componentDidMount() {
      authAPI.authMe()
         .then((data) => {
            let {id, email, login} = data.data;

            if (data.resultCode === 0) {
               this.props.setUserData(id, email, login);
            }
         })
   }

   render() {
      return <Header {...this.props}  />
   }
}

type MapStateType = {
   id: number | null
   isAuth: boolean
   login: string | null
}

const mapStateToProps = (state: StateType): MapStateType => ({
   id: state.auth.id,
   login: state.auth.login,
   isAuth: state.auth.isAuth
});

const connector = connect(mapStateToProps, {setUserData});

type TProps = ConnectedProps<typeof connector>;

export default connector(HeaderContainer);


