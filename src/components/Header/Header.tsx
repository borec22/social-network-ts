import React from 'react';
import logo from './../../logo.svg'
import classes from './Header.module.css';
import {NavLink, Redirect} from 'react-router-dom';
import {PATH} from '../../App';
import {useDispatch} from "react-redux";

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
}


export const Header: React.FC<PropsType> = (props) => {
    const {isAuth, login, logout} = props;

    const dispatch = useDispatch();

    return (
        <header className={classes.header}>
            <div className={classes.logoBlock}>
                <img src={logo}
                     alt="logo"/>
            </div>

            <div className={classes.loginBlock}>
                {isAuth ? <>{login} / <span onClick={logout}>logout</span></> :
                    <NavLink to={PATH.LOGIN}>login</NavLink>}
            </div>
        </header>
    );
}
