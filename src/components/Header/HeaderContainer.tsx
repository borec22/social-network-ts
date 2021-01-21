import React from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {Header} from './Header';
import axios from 'axios';
import {setUserData} from '../../redux/auth-reducer';

class HeaderContainer extends React.Component<TProps> {
   constructor(props: TProps) {
      super(props)
   }

   componentDidMount() {
      axios.get('https://social-network.samuraijs.com/api/1.0/auth/me', {
         withCredentials: true,
         headers: {
            'API-KEY': '89e8e364-2267-45f8-866b-f315992878e1'
         }
      })
         .then((response) => {
            let {id, email, login} = response.data.data;

            if (response.data.resultCode === 0) {
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


