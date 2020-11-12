import React from 'react';
import classes from'./Header.module.css';

export const Header = () => {
  return (
      <header className={classes.header}>
        <div>
          <img src="https://encrypted-tbn0.gstatic.com/
          images?q=tbn%3AANd9GcRH590LBEXenB-MRfAkOW-2vhDcAqb1gP0dLw&usqp=CAU"
               alt="logo"/>
        </div>
      </header>
  );
}
