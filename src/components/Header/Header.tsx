import React from 'react';
import logo from './../../logo.svg'
import classes from'./Header.module.css';

export const Header = () => {
  return (
      <header className={classes.header}>
        <div>
          <img src={logo}
               alt="logo"/>
        </div>
      </header>
  );
}
