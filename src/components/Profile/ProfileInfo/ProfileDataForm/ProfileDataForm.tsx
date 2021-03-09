import React from "react";
import {Field, Form} from "react-final-form";
import classes from "../ProfileInfo.module.css";
import classes2 from "../../../Login/Login.module.css";
import {ProfileStatus} from "../ProfileStatus/ProfileStatus";
import {Textarea, TextInput} from "../../../../common/form-component/FormControl/FormControl";
import {required} from "../../../../utils/validators";
import {UpdateDomainProfileModelType, UserProfileType} from "../../../../redux/profile-reducer";

type FormDataType = UpdateDomainProfileModelType;

type ProfileDataForm = {
    profileData: UserProfileType
    status: string
    updateProfileStatus: (status: string) => void
    updateProfile: (domainModel: UpdateDomainProfileModelType) => void
    error: string | null
}


export const ProfileDataForm: React.FC<ProfileDataForm> = (
    {
        profileData: {
            fullName,
            aboutMe,
            lookingForAJob,
            lookingForAJobDescription,
            contacts
        },
        status,
        updateProfileStatus,
        updateProfile,
        error,
        ...restProps
    }
) => {

    const onSubmitFormHandler = async (values: FormDataType) => {
        updateProfile(values);
    }

    return (
        <Form
            onSubmit={onSubmitFormHandler}
            subscription={{
                submitting: true
            }}
            render={(props) => {
                const {handleSubmit, submitting, form} = props;

                return (
                    <form className={classes.descriptionBlock} onSubmit={handleSubmit}>

                        {error &&
                        <div className={classes2.formSummaryError}>
                            {error}
                        </div>}
                        <div>
                            <button type='submit'>save</button>
                        </div>

                        <div>
                            <ProfileStatus status={status} updateProfileStatus={updateProfileStatus}/>
                            <span><b>Full name:</b>
                                <Field name='fullName'
                                       component={TextInput}
                                       placeholder='Full name'
                                       initialValue={fullName}
                                       validate={required}
                                       subscription={{
                                           value: true,
                                           error: true,
                                           touched: true
                                       }}
                                />
                            </span>
                        </div>
                        <div>
                            <span><b>About me:</b>
                                <Field name='aboutMe'
                                       component={TextInput}
                                       placeholder='About me'
                                       initialValue={aboutMe}
                                       validate={required}
                                       subscription={{
                                           value: true,
                                           error: true,
                                           touched: true
                                       }}
                                />
                            </span>
                        </div>
                        <div className={classes.contacts}>
                            <b>Contacts:</b>
                            <div>
                                {contacts &&
                                Object.entries(contacts).map(([title, value], index) => {
                                    return <span key={title}><b>{title}:</b>
                                        {<Field name={`contacts.${title}`}
                                                key={title}
                                                initialValue={Object(contacts)[title]}
                                                component={TextInput}
                                                placeholder={title}
                                                subscription={{
                                                    value: true,
                                                    error: true,
                                                    touched: true
                                                }}
                                        />}
                                    </span>
                                })
                                }
                            </div>
                        </div>
                        <div>
                            <span><b>Looking for a job:</b>
                                <Field name='lookingForAJob'
                                       component={TextInput}
                                       type='checkbox'
                                />
                            </span>
                        </div>
                        <div>
                            <span><b>My professionals skills:</b>
                                <Field name='lookingForAJobDescription'
                                       initialValue={lookingForAJobDescription}
                                       validate={required}
                                       component={Textarea}
                                       placeholder='React, JS...'
                                       subscription={{
                                           value: true,
                                           error: true,
                                           touched: true
                                       }}
                                />
                            </span>
                        </div>
                    </form>
                )
            }}
        />
    );
};