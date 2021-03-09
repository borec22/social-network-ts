import React from 'react';
import logo from './../../logo.svg'
import classes from './Header.module.css';
import {NavLink, useHistory} from 'react-router-dom';
import {setUserData} from "../../redux/auth-reducer";

type PropsType = {
    login: string | null
    isAuth: boolean
    logout: () => void
    setUserData: (id: number | null, email: string | null, login: string | null, isAuth: boolean) => void
}


export const Header: React.FC<PropsType> = (props) => {
    const {isAuth, login, logout, setUserData} = props;
    const history = useHistory();

    const logoutHandler = () => {
        logout();
        setUserData(null, null, null, false);
        history.push('/login');
    };

    return (
        <header className={classes.header}>
            <div className={classes.logoBlock}>
                <img src={logo}
                     alt="logo"/>
            </div>

            <div className={classes.loginBlock}>
                {isAuth ? <>{login} / <span onClick={logoutHandler}>logout</span></> :
                    <NavLink to={'/login'}>login</NavLink>}
            </div>
        </header>
    );
}
