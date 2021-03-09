import React from "react";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import classes from "../ProfileInfo.module.css";
import {UserProfileType} from "../../../../redux/profile-reducer";

type ProfileDataType = {
    profileData: UserProfileType
    isOwner: boolean
    switchEditMode: (isEditMode: boolean) => void
    status: string
    updateProfileStatus: (status: string) => void
}

export const ProfileData: React.FC<ProfileDataType> = (
    {
        profileData: {
            aboutMe,
            contacts,
            lookingForAJob,
            lookingForAJobDescription,
            fullName
        },
        isOwner,
        status,
        updateProfileStatus,
        switchEditMode,
        ...restProps
    }
) => {

    return (
        <>
            {isOwner && <div onClick={() => {
                switchEditMode(true)
            }}>
                <button>Edit profile</button>
            </div>}
            <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
            <div>
                <span><b>Full name:</b> {fullName}</span>
            </div>
            <div>
                <span><b>About me:</b> {aboutMe}</span>
            </div>
            <div>
                <span><b>Looking for a job:</b> {lookingForAJob ? 'true' : 'false'}</span>
            </div>
            <div>
                <span><b>My professionals skills:</b> {lookingForAJobDescription}</span>
            </div>
            <div className={classes.contacts}>
                <b>Contacts:</b>
                <div>
                    {contacts &&
                    Object.entries(contacts).map(([title, value], index) =>
                        <Contact key={index}
                                 contactTitle={title}
                                 contactValue={value}/>)
                    }
                </div>
            </div>
        </>
    );
}


type ContactPropsType = {
    contactTitle: string
    contactValue: string | null
};

const Contact: React.FC<ContactPropsType> = ({contactTitle, contactValue}) => {
    return <>
        <span><b>{contactTitle}:</b> {contactValue}</span><br/>
    </>
}