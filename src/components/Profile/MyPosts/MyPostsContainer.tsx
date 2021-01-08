import React from 'react';
import {addPostAC, updatePostTextAC} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';

const mapStateToProps = (state: StateType) => ({
   newPostText: state.profilePage.newPostText,
   postsData: state.profilePage.posts
});

const mapDispatchToProps = (dispatch: any) => ({
   addPost: () => dispatch(addPostAC()),
   updatePostText: (textPost: string) => dispatch(updatePostTextAC(textPost))
})

export const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);

/*postsData={state.profilePage.posts}
addPost={addPost}
updatePostText={updatePostText}
newPostText={state.profilePage.newPostText}*/

