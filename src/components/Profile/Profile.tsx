import React from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';


type ProfileType = {
   store: any
}

export const Profile: React.FC<ProfileType> = (props) => {
   return (
      <div className={classes.profileContainer}>
         <ProfileInfo/>
         <MyPostsContainer store={props.store}/>
      </div>
   );
}

