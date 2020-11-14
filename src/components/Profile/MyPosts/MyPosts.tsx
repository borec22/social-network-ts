import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';

export const MyPosts = () => {
    return (
        <div>
            <h3>My posts</h3>
            <div>
                <textarea value={'text'} placeholder='New post text...' />
            </div>
            <div>
                <button>Add post</button>
            </div>

            <div className={classes.posts}>
                <Post message='I love Ukraine.' likesCount={10} />
                <Post message='React is the best!!!' likesCount={3} />
            </div>
        </div>
    );
}

