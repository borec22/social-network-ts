import React, {ChangeEvent, useEffect, useState} from 'react';
import classes from './ProfileInfo.module.css';
import {UpdateDomainProfileModelType, UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/preloader/Preloader';
import avatarDefault from "../../../assets/images/user_default.png";
import {ProfileDataForm} from "./ProfileDataForm/ProfileDataForm";
import {ProfileData} from "./ProfileData/ProfileData";

type PropsType = {
    userProfile: UserProfileType | null,
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    status: string
    updateProfileStatus: (status: string) => void
    authenticationId: string
    isOwner: boolean
    savePhoto: (photo: File) => void
    isUpdateProfileSuccess: boolean
    updateProfile: (domainModel: UpdateDomainProfileModelType) => void
    setUpdateProfileSuccess: (isUpdateProfileSuccess: boolean) => void
    error: string | null
    setProfileError: (error: null | string) => void
}


export const ProfileInfo: React.FC<PropsType> = React.memo((props) => {
    let {
        userProfile, status, updateProfileStatus,
        isOwner, savePhoto, isUpdateProfileSuccess,
        updateProfile, setUpdateProfileSuccess, error,
        setProfileError
    } = props;
    const [editMode, setEditMode] = useState(false);

    useEffect( () => {
        if (isUpdateProfileSuccess) {
            setEditMode(false);
            setUpdateProfileSuccess(false);
            setProfileError(null);
        }
    }, [isUpdateProfileSuccess] );

    if (!userProfile) {
        return <Preloader/>;
    } else {
        const {photos} = userProfile;

        const onProfilePhotoSelected = (e: ChangeEvent<HTMLInputElement>) => {
            const files = e.target.files;

            if (files && files.length > 0) {
                savePhoto(files[0]);
            }
        };


        return (
            <div className={classes.profile}>
                <div>
                    {photos && <img src={photos.large ? photos.large : avatarDefault} alt="ava"/>}

                    {isOwner &&
                    <div>
                        <input type="file" onChange={(e) => onProfilePhotoSelected(e)}/>
                    </div>}<br/>
                </div>
                {editMode ? <ProfileDataForm profileData={userProfile}
                                             status={status}
                                             updateProfileStatus={updateProfileStatus}
                                             updateProfile={updateProfile} error={error}/> :
                    <ProfileData profileData={userProfile}
                                 isOwner={isOwner}
                                 switchEditMode={setEditMode}
                                 status={status}
                                 updateProfileStatus={updateProfileStatus}/>}
            </div>
        );
    }
});





