import React from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';
import {Redirect, RouteComponentProps} from 'react-router-dom';

type PathParamsType = {
   userId: string,
}

type OwnPropsType = {
   userProfile: UserProfileType | null,
   getProfile: (userId: string) => void,
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

export const Profile: React.FC<PropsType> = (props) => {
   debugger
   const {userProfile, getProfile, match} = props;
   const userId = match.params.userId;

   return (
      <div className={classes.profileContainer}>
         <ProfileInfo userProfile={userProfile} userId={userId} getProfile={getProfile}/>
         <MyPostsContainer/>
      </div>
   );
}

