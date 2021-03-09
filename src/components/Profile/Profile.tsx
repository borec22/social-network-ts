import React, {useEffect} from 'react';
import classes from './Profile.module.css';
import {ProfileInfo} from './ProfileInfo/ProfileInfo';
import {MyPostsContainer} from './MyPosts/MyPostsContainer';
import {UpdateDomainProfileModelType, updateProfile, UserProfileType} from '../../redux/profile-reducer';
import {RouteComponentProps} from 'react-router-dom';

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
    savePhoto: (photo: File) => void
    isUpdateProfileSuccess: boolean
    updateProfile: (domainModel: UpdateDomainProfileModelType) => void
    setUpdateProfileSuccess: (isUpdateProfileSuccess: boolean) => void
    error: string | null
    setProfileError: (error: null | string) => void
}

type PropsType = RouteComponentProps<PathParamsType> & OwnPropsType;


export const Profile: React.FC<PropsType> = React.memo((props) => {
    const {
        userProfile, getProfile, getStatus,
        updateProfileStatus, status, match,
        authenticationId, savePhoto, isUpdateProfileSuccess,
        updateProfile, setUpdateProfileSuccess, error, setProfileError
    } = props;

    useEffect(() => {
        let userId = match.params.userId;

        if (!userId) {
            userId = authenticationId;

            if (!userId) {
                props.history.push('/login');
            }
        }

        if (!userId) {
            console.error("ID should exists in URI params or in state ('authorizedUserId')");
        } else {
            getProfile(userId);
            getStatus(userId);
        }
    }, [match.params.userId])

    return (
        <div className={classes.profileContainer}>
            <ProfileInfo userProfile={userProfile}
                         isOwner={!match.params.userId}
                         getProfile={getProfile}
                         getStatus={getStatus}
                         status={status}
                         updateProfileStatus={updateProfileStatus}
                         authenticationId={authenticationId}
                         savePhoto={savePhoto}
                         isUpdateProfileSuccess={isUpdateProfileSuccess}
                         updateProfile={updateProfile}
                         setUpdateProfileSuccess={setUpdateProfileSuccess}
                         error={error}
                         setProfileError={setProfileError}
            />
            <MyPostsContainer/>
        </div>
    );
});

