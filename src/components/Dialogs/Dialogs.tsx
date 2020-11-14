import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './Dialogs.module.css';

export const Dialogs = () => {
   return (
      <div className={classes.dialogs}>
         <div className={classes.dialogsItems}>
            <div className={classes.dialog}>
               <NavLink to='/dialogs/Andriy'
                        activeClassName={classes.active}>
                  Andriy
               </NavLink>
            </div>
            <div className={classes.dialog}>
               <NavLink to='/dialogs/Serhiy'
                        activeClassName={classes.active}>
                  Serhiy
               </NavLink>
            </div>
            <div className={classes.dialog}>
               <NavLink to='/dialogs/Oleg'
                        activeClassName={classes.active}>
                  Oleg
               </NavLink>
            </div>
            <div className={classes.dialog}>
               <NavLink to='/dialogs/Lesya'
                        activeClassName={classes.active}>
                  Lesya
               </NavLink>
            </div>
            <div className={classes.dialog}>
               <NavLink to='/dialogs/Sasha'
                        activeClassName={classes.active}>
                  Sasha
               </NavLink>
            </div>
         </div>

         <div className={classes.messages}>
            <div className={classes.message}>
               Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem, sunt?
            </div>
            <div className={classes.message}>
               Lorem ipsum dolor sit amet.
            </div>
            <div className={classes.message}>
               Lorem ipsum dolor.
            </div>
         </div>
      </div>
   );
}