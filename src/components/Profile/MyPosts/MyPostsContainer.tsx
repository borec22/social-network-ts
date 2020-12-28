import React, {useRef} from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {ActionsType, PostType} from '../../../redux/store';
import {addPostAC, updatePostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import { StoreContext } from '../../../StoreProvider';

type MyPostContainerType = {}

export const MyPostsContainer: React.FC<MyPostContainerType> = (props) => {

   return <StoreContext.Consumer>
      {store => {

         const state: any = store.getState();

         const addPost = () => {
            store.dispatch(addPostAC());
         }

         const updatePostText = (textPost: string) => {
            store.dispatch(updatePostTextAC(textPost));
         }

         return <MyPosts postsData={state.profilePage.posts}
                         addPost={addPost}
                         updatePostText={updatePostText}
                         newPostText={state.profilePage.newPostText} />
      }}
   </StoreContext.Consumer>
}

