import React from 'react';
import logo from './../../logo.svg'
import classes from './Header.module.css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../App';

type PropsType = {
   id: number | null
   login: string | null
   isAuth: boolean
   setUserData: (id: number, email: string, login: string) => void
}

export const Header: React.FC<PropsType> = (props) => {

   return (
      <header className={classes.header}>
         <div className={classes.logoBlock}>
            <img src={logo}
                 alt="logo"/>
         </div>

         <div className={classes.loginBlock}>
            {props.isAuth ? props.login : <NavLink to={PATH.LOGIN}>login</NavLink>}
         </div>
      </header>
   );
}
