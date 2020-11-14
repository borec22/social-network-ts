import React from 'react';
import classes from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';

export const Profile = () => {
    return (
        <div className={classes.profileContainer}>
            <div>
                ava + description
            </div>
            <MyPosts />
        </div>
    );
}

