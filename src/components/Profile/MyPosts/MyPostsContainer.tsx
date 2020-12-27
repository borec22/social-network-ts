import React, {useRef} from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionsType, PostType} from '../../../redux/store';
import {addPostAC, updatePostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';

type MyPostContainerType = {
   store: any
}

export const MyPostsContainer: React.FC<MyPostContainerType> = (props) => {
   const state: any = props.store.getState();

   const addPost = () => {
      props.store.dispatch(addPostAC());
   }

   const updatePostText = (textPost: string) => {
      props.store.dispatch(updatePostTextAC(textPost));
   }

   return <MyPosts postsData={state.profilePage.posts}
                   addPost={addPost}
                   updatePostText={updatePostText}
                   newPostText={state.profilePage.newPostText} />
}

