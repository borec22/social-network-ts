import React, {useEffect} from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UserProfileType} from '../../redux/profile-reducer';
import {RouteComponentProps} from 'react-router-dom';
import {PATH} from "../../App";

type PathParamsType = {
    userId: string,
}

type OwnPropsType = {
    userProfile: UserProfileType | null
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    status: string,
    updateProfileStatus: (status: string) => void
    authenticationId: string
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;

export const Profile: React.FC<PropsType> = (props) => {
    const {userProfile, getProfile, getStatus, updateProfileStatus, status, match, authenticationId} = props;
    let userId = match.params.userId;

    if (!userId) {
        userId = authenticationId;

        if (!userId) {
            props.history.push(PATH.LOGIN);
        }
    }

    useEffect(() => {
        getProfile(userId);
        getStatus(userId);

    }, [])

    return (
        <div className={classes.profileContainer}>
            <ProfileInfo userProfile={userProfile}
                         getProfile={getProfile}
                         getStatus={getStatus}
                         status={status}
                         updateProfileStatus={updateProfileStatus}
                         authenticationId={authenticationId}
            />
            <MyPostsContainer/>
        </div>
    );
}

