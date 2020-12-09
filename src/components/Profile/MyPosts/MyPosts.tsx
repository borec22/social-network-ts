import React, {useRef} from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionsType, addPostAC, PostType, updatePostTextAC} from '../../../redux/store';

type MyPostType = {
   postsData: Array<PostType>
   dispatch: (action: ActionsType) => void
   newPostText: string
}

export const MyPosts: React.FC<MyPostType> = (props) => {
   const postsElements = props.postsData.map(post => <Post key={post.id}
                                                           message={post.message}
                                                           likesCount={post.likesCount}/>);
   const newPostElement = useRef<HTMLTextAreaElement>(null);

   const handlerAddPost = () => {
      if (props.newPostText.trim() !== '') {
         props.dispatch(addPostAC());
      }
   }
   const handlerUpdatePostText = () => {

      if (newPostElement.current) {
         let textPost = newPostElement.current.value;
         props.dispatch(updatePostTextAC(textPost));
      }
   }

   return (
      <div>
         <h3>My posts</h3>
         <div>
            <textarea ref={newPostElement}
                      value={props.newPostText}
                      placeholder='New post text...'
                      onChange={handlerUpdatePostText}>area </textarea>
         </div>
         <div>
            <button onClick={handlerAddPost}>Add post</button>
         </div>
         <div className={classes.posts}>
            {postsElements}
         </div>
      </div>
   );
}

