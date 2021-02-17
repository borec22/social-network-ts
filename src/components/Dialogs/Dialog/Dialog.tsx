import React from 'react';
import classes from './Dialog.module.css';
import {NavLink} from 'react-router-dom';

type DialogProps = {
   id: number
   name: string
}
export const Dialog: React.FC<DialogProps> = React.memo((props) => {
    return (
        <div className={classes.dialog}>
            <NavLink to={`/dialogs/${props.id}`}
                     activeClassName={classes.active}>
                {props.name}
            </NavLink>
        </div>
    );
});