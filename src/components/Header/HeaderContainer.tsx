import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {Header} from './Header';
import {auth, setUserData} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component<TProps> {
   constructor(props: TProps) {
      super(props);
   }

   componentDidMount() {
      this.props.auth();
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

const connector = connect(mapStateToProps, {setUserData, auth});

type TProps = ConnectedProps<typeof connector>;

export default connector(HeaderContainer);


