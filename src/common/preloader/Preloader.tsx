import preloader from '../../assets/images/Spinner-1.5s-200px.svg';
import React from 'react';

type PropsType = {}

export const Preloader: React.FC<PropsType> = (props) => {
   return (
      <>
         <img src={preloader} alt='preloader'/>
      </>
   );
}