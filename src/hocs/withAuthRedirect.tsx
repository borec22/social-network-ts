import React, {ComponentType} from 'react';
import {connect} from 'react-redux';
import {StateType} from '../redux/redux-store';
import {Redirect} from 'react-router-dom';

type MapStateToPropsType = {
   isAuth: boolean
}

const mapStateToProps = (state: StateType): MapStateToPropsType => ({
   isAuth: state.auth.isAuth
});


export function withAuthRedirect <T>(WrappedComponent: ComponentType<T>) {

   function RedirectComponent (props: MapStateToPropsType) {
      const {isAuth, ...restProps} = props;

      if (!isAuth) {
         return <Redirect to={'/login'}/>
      }

      return <WrappedComponent {...restProps as T}/>
   }


   return connect(mapStateToProps)(RedirectComponent);
}