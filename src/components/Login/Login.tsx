import React from 'react';
import classes from './Login.module.css';

type PropsType = {}

export const Login: React.FC<PropsType> = React.memo((props) => {
   return (
      <div className={classes.container}>
         <h3>Login Form</h3>
         <form action="#" className={classes.form}>
            <label htmlFor="login">
               Login: <input type="text" id='login'/>
            </label>
            <label htmlFor="password">
               Password: <input type="password" id='password'/>
            </label>
            <input type='submit' value='submit'/>
         </form>
      </div>
   );
})