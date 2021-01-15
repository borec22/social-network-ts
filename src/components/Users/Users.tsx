import React, {useEffect, useState} from 'react';
import {UserType} from '../../redux/users-reducer';
import avatarDefault from '../../assets/images/user_default.png';
import classes from './Users.module.css';
import axios from 'axios';
import preloader from '../../assets/images/Spinner-1.5s-200px.svg';
import {Preloader} from '../../common/preloader/Preloader';

type PropsType = {
   users: Array<UserType>
   follow: (userId: number) => void
   unFollow: (userId: number) => void
   setUsers: (users: Array<UserType>) => void
   setTotalCount: (totalCount: number) => void
   totalCount: number,
   pageSize: number,
   currentPage: number,
   setCurrentPage: (page: number) => void
   setIsFetching: (isFetching: boolean) => void
   isFetching: boolean
}

export const Users: React.FC<PropsType> = (props) => {
   const {users, totalCount, pageSize, currentPage, isFetching} = props;

   useEffect(() => {
      props.setIsFetching(true);
      axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${props.pageSize}`)
         .then(response => {
            props.setUsers(response.data.items);
            props.setTotalCount(response.data.totalCount);
            props.setIsFetching(false);
         })
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

   return (
      <>
         {isFetching && <Preloader/>}
         { users.map(user => <div key={user.id} style={{marginTop: '10px'}}>
            <span>
               <div>
                  <img src={user.photos.small ? user.photos.small : avatarDefault} alt="user photo" className={classes.userPhoto}/>
               </div>
               <div>
                  {user.followed ?
                     <button onClick={() => props.unFollow(user.id)}>Unfollow</button> :
                     <button onClick={() => props.follow(user.id)}>Follow</button>
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