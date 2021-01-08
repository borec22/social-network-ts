import React from 'react';
import classes from './Navbar.module.css';
import {NavLink} from 'react-router-dom';
import {PATH} from '../../App';

export const Navbar = () => {
    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarItem}>
               <NavLink to={PATH.PROFILE}
                        activeClassName={classes.active}
                        className={classes.link}>
                  Profile
               </NavLink>
            </div>
            <div className={classes.navbarItem}>
               <NavLink to={PATH.DIALOGS}
                        activeClassName={classes.active}
                        className={classes.link}>
                  Messages
               </NavLink>
            </div>
           <div className={classes.navbarItem}>
              <NavLink to={PATH.USERS}
                       activeClassName={classes.active}
                       className={classes.link}>
                 Users
              </NavLink>
           </div>
            <div className={classes.navbarItem}>
                <a href="#" className={classes.link}>News</a>
            </div>
            <div className={classes.navbarItem}>
                <a href="#" className={classes.link}>Music</a>
            </div>
        </nav>
    );
}