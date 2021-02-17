import React from 'react';
import {NavLink} from "react-router-dom";
import avatarDefault from "../../../assets/images/user_default.png";
import classes from "../Users.module.css";
import {UserType} from "../../../api/api";

type PropsType = UserType & {
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followingInProgress: number[]
}

export const User: React.FC<PropsType> = (
    {
        id,
        status,
        name,
        followed,
        photos,
        uniqueUrlName,
        follow,
        unfollow,
        followingInProgress
    }
) => {
    return (
        <div key={id} style={{marginTop: '10px'}}>
            <span>
               <div>
                  <NavLink to={'/profile/' + id}>
                     <img src={photos.small ? photos.small : avatarDefault} alt="user photo"
                          className={classes.userPhoto}/>
                  </NavLink>
               </div>
               <div>
                  {followed ?
                      <button
                          onClick={() => unfollow(id)}
                          disabled={followingInProgress.some(userId => userId === id)}
                      >
                          Unfollow
                      </button> :

                      <button
                          onClick={() => follow(id)}
                          disabled={followingInProgress.some(userId => userId === id)}
                      >
                          Follow
                      </button>
                  }
               </div>
            </span>
            <span>
               <span>
                  <div>{name}</div>
                  <div>{status}</div>
               </span>
            </span>
        </div>
    );
}