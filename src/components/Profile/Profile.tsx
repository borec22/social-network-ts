import React from 'react';
import classes from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {PostType} from '../../index';

type ProfileType = {
   postsData: Array<PostType>
}

export const Profile: React.FC<ProfileType> = (props) => {
    return (
        <div className={classes.profileContainer}>
            <ProfileInfo />
            <MyPosts postsData={props.postsData} />
        </div>
    );
}

