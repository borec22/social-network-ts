import React, {useEffect} from 'react';
import classes from './ProfileInfo.module.css';
import {UserProfileType} from '../../../redux/profile-reducer';
import {Preloader} from '../../../common/preloader/Preloader';
import {ProfileStatus} from './ProfileStatus/ProfileStatus';

type PropsType = {
    userProfile: UserProfileType | null,
    getProfile: (userId: string) => void
    getStatus: (userId: string) => void
    status: string
    updateProfileStatus: (status: string) => void
    authenticationId: string
}


export const ProfileInfo: React.FC<PropsType> = (props) => {
    let {userProfile, getProfile, getStatus, status, updateProfileStatus, authenticationId} = props;

    if (!userProfile) {
        return <Preloader/>;
    } else {

        const {
            aboutMe,
            contacts,
            lookingForAJob,
            lookingForAJobDescription,
            fullName,
            photos: {small, large}
        } = userProfile;

        return (
            <div className={classes.profile}>
                <div>
                    <img src={large ? large : ''} alt="ava"/>
                </div>
                <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
                <div>
                    <span>About me: {aboutMe}</span>
                </div>
                <div className={classes.contacts}>
                    Contacts:
                    <div>
                        <span>facebook: {contacts.facebook}</span><br/>
                        <span>github: {contacts.github}</span><br/>
                        <span>instagram: {contacts.instagram}</span><br/>
                        <span>mainLink: {contacts.mainLink}</span><br/>
                        <span>twitter: {contacts.twitter}</span><br/>
                        <span>vk: {contacts.vk}</span><br/>
                        <span>website: {contacts.website}</span><br/>
                        <span>youtube: {contacts.youtube}</span><br/>
                    </div>
                </div>
                <div>
                    {lookingForAJob ? <span>I am looking a job</span> :
                        <span>I am not looking a job</span>}
                </div>
                <div>
                    <span>Description: {lookingForAJobDescription}</span>
                </div>
                <div>
                    <span>Full name: {fullName}</span>
                </div>
            </div>
        );
    }
}