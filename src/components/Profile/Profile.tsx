import React from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';


type ProfileType = {}

export const Profile: React.FC<ProfileType> = (props) => {
   return (
      <div className={classes.profileContainer}>
         <ProfileInfo/>
         <MyPostsContainer/>
      </div>
   );
}

