import React from "react";
import s from './Error404.module.css';
import { Link } from "react-router-dom";

function Error404() {
   return (
      <div className={s.verticalCenter}>
         <div className={s.container}>
            <h1>😮</h1>
            <h2>Oops! Page Not Be Found</h2>
            <p>Sorry but the page you are looking for does not exist.</p>
            {/*<a href="/">Back to homepage</a>*/}
            <Link to="/">Back to homepage</Link>
         </div>
      </div>
   );
}

export default React.memo(Error404);