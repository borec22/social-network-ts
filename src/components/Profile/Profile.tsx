import React from 'react';
import classes from './Profile.module.css';
import {MyPosts} from './MyPosts/MyPosts';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {ActionsType, ProfilePageType} from '../../redux/store';

type ProfileType = {
   profilePage: ProfilePageType
   dispatch: (action: ActionsType) => void
}

export const Profile: React.FC<ProfileType> = (props) => {
   return (
      <div className={classes.profileContainer}>
         <ProfileInfo/>
         <MyPosts postsData={props.profilePage.posts}
                  dispatch={props.dispatch}
                  newPostText={props.profilePage.newPostText}/>
      </div>
   );
}

