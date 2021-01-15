import React from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';


type ProfileType = {
   userProfile: UserProfileType | null,
   setUserProfile: (userData: UserProfileType) => void
}

export const Profile: React.FC<ProfileType> = (props) => {
   const {userProfile, setUserProfile} = props;
   return (
      <div className={classes.profileContainer}>
         <ProfileInfo userProfile={userProfile} setUserProfile={setUserProfile}/>
         <MyPostsContainer/>
      </div>
   );
}

