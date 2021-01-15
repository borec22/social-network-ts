import React from 'react';
import classes from './Preloader.module.css';

type PropsType = {}

export const Preloader: React.FC<PropsType> = (props) => {
   return (
      <>
         <div className={classes.ldsRing}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
         </div>
      </>
   );
}