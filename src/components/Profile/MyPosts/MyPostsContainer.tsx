import React from 'react';
import {addPost} from '../../../redux/profile-reducer';
import {MyPosts} from './MyPosts';
import {StateType} from '../../../redux/redux-store';
import {connect} from 'react-redux';

const mapStateToProps = (state: StateType) => ({
   postsData: state.profilePage.posts
});

export const MyPostsContainer = connect(mapStateToProps, {addPost})(MyPosts);

