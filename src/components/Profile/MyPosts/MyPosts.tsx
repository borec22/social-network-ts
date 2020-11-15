import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../redux/state';

type MyPostType = {
   postsData: Array<PostType>
}

export const MyPosts: React.FC<MyPostType> = (props) => {
   const postsElements = props.postsData.map(post => <Post key={post.id} message={post.message} likesCount={post.likesCount}/>);

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
            {postsElements}
         </div>
      </div>
   );
}

