import React from 'react';
import classes from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ProfilePageType} from '../../redux/state';

type ProfileType = {
   profilePage: ProfilePageType
}

export const Profile: React.FC<ProfileType> = (props) => {
   return (
      <div className={classes.profileContainer}>
         <ProfileInfo/>
         <MyPosts postsData={props.profilePage.posts}/>
      </div>
   );
}

