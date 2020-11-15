import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';

export const MyPosts = () => {

   let postsData = [
      {id: 1, message: 'I love Ukraine.', likesCount: 10},
      {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
   ];

   const posts = postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

   return (
      <div>
         <h3>My posts</h3>
         <div>
            <textarea value={'text'} placeholder='New post text...'/>
         </div>
         <div>
            <button>Add post</button>
         </div>

         <div className={classes.posts}>
            {posts}
         </div>
      </div>
   );
}

