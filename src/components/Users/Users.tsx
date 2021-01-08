import React, {useEffect} from 'react';
import {setUsers, UserType} from '../../redux/users-reducer';
import classes from './Users.module.css';

type PropsType = {
   users: Array<UserType>
   follow: (userId: number) => void
   unFollow: (userId: number) => void
   setUsers: (users: Array<UserType>) => void
}

export const Users: React.FC<PropsType> = (props) => {
   useEffect(() => {
      props.setUsers([
         {
            id: 1,
            fullName: 'Heorhiy',
            isFollowed: false,
            status: 'I am the best!!!',
            location: {country: 'Ukraine', city: 'Kiev'},
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZM8VeR9_5YQVo81WlrkO9CA2IiUIQbjh2g&usqp=CAU'
         },
         {
            id: 2,
            fullName: 'Viktor',
            isFollowed: true,
            status: 'I am the best too!!!',
            location: {country: 'Belarus', city: 'Minsk'},
            photoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLZM8VeR9_5YQVo81WlrkO9CA2IiUIQbjh2g&usqp=CAU'
         },
      ]);
   }, [])
   return (
      <div>
         {props.users.map(user => <div key={user.id}>
            <span>
               <div>
                  <img src={user.photoUrl} alt="user photo" className={classes.userPhoto}/>
               </div>
               <div>
                  {user.isFollowed ?
                     <button onClick={() => props.unFollow(user.id)}>Unfollow</button> :
                     <button onClick={() => props.follow(user.id)}>Follow</button>
                  }
               </div>
            </span>
            <span>
               <span>
                  <div>{user.fullName}</div>
                  <div>{user.status}</div>
               </span>
               <span>
                  <div>{user.location.country}</div>
                  <div>{user.location.city}</div>
               </span>
            </span>
         </div>)}
      </div>
   );
}