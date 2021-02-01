import React, {useEffect} from 'react';
import {UserType} from '../../redux/users-reducer';
import avatarDefault from '../../assets/images/user_default.png';
import classes from './Users.module.css';
import axios from 'axios';
import {Preloader} from '../../common/preloader/Preloader';
import {NavLink} from 'react-router-dom';
import {followAPI, usersAPI} from '../../api/api';

type PropsType = {
   users: Array<UserType>
   follow: (userId: number) => void
   unFollow: (userId: number) => void
   pageSize: number,
   currentPage: number,
   totalCount: number,
   isFetching: boolean,
   setCurrentPage: (page: number) => void
   followingInProgress: Array<number>
   setFollowingInProgress: (isFetching: boolean, userId: number) => void
   getUsers: (currentPage: number, pageSize: number) => void
}

export const Users: React.FC<PropsType> = (props) => {
   const {users, totalCount, pageSize, currentPage, isFetching, followingInProgress} = props;

   useEffect(() => {
      props.getUsers(props.currentPage, props.pageSize);
   }, [currentPage, pageSize]);

   let countPages: number;
   let pages: Array<number> = [];

   if (totalCount) {
      countPages = Math.ceil(totalCount / pageSize);

      for (let i = 1; i <= countPages; i++) {
         pages.push(i);
      }
   }

   const changePage = (page: number) => {
      props.setCurrentPage(page);
   }

   let pagesElement = pages.map((page, index) => {
      return <span key={index}
                   className={`${classes.page } ${page === currentPage? classes.activePage : ''}`}
                   onClick={() => changePage(page)}>
         {page}
      </span>
   })

   const followHandler = (userId: number) => props.follow(userId);

   const unFollowHandler = (userId: number) => props.unFollow(userId);

   return (
      <>
         {isFetching && <Preloader/>}
         { users.map(user => <div key={user.id} style={{marginTop: '10px'}}>
            <span>
               <div>
                  <NavLink to={'/profile/' + user.id}>
                     <img src={user.photos.small ? user.photos.small : avatarDefault} alt="user photo" className={classes.userPhoto}/>
                  </NavLink>
               </div>
               <div>
                  {user.followed ?
                     <button
                        onClick={() => unFollowHandler(user.id)}
                        disabled={followingInProgress.some(id => id === user.id)}
                     >
                        Unfollow
                     </button> :

                     <button
                        onClick={() => followHandler(user.id)}
                        disabled={followingInProgress.some(id => id === user.id)}
                     >
                        Follow
                     </button>
                  }
               </div>
            </span>
            <span>
               <span>
                  <div>{user.name}</div>
                  <div>{user.status}</div>
               </span>
            </span>
         </div>)}
         <div className={classes.pagination}>
            {pagesElement}
         </div>
      </>
   );
}