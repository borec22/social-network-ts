import React from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';
import { RouteComponentProps } from 'react-router-dom';

type PathParamsType = {
   userId: string,
}

type OwnPropsType = {
   userProfile: UserProfileType | null,
   setUserProfile: (userData: UserProfileType) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

export const Profile: React.FC<PropsType> = (props) => {

   const {userProfile, setUserProfile, match} = props;
   const userId = match.params.userId;

   return (
      <div className={classes.profileContainer}>
         <ProfileInfo userProfile={userProfile} setUserProfile={setUserProfile} userId={userId}/>
         <MyPostsContainer/>
      </div>
   );
}

