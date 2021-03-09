import React from 'react';
import classes from './MyPosts.module.css';
import {Post} from './Post/Post';
import {PostType} from '../../../redux/profile-reducer';
import {Field, Form} from "react-final-form";
import {Textarea} from "../../../common/form-component/FormControl/FormControl";

type MyPostType = {
    postsData: Array<PostType>
    addPost: (text: string) => void
}
type ValuesType = {
    post: string
}

export const MyPosts: React.FC<MyPostType> = React.memo((props) => {
    console.log('Render MyPost')

    const postsElements = props.postsData.map(post => <Post key={post.id}
                                                            message={post.text}
                                                            likesCount={post.likesCount}/>);

    const required = (value: any) => value ? undefined : 'Required';
    const showResults = (values: ValuesType) => {
        props.addPost(values.post);
    }

    return (
        <div>
            <h3>My posts</h3>
            <Form
                onSubmit={showResults}
                subscription={{
                    submitting: true,
                    values: true
                }}
                render={(props) => {
                    const {handleSubmit, submitting, values, form} = props;

                    return (
                        <form onSubmit={async event => {
                            await handleSubmit(event);
                            form.reset();
                        }}>
                            <Field name='post'
                                   component={Textarea}
                                   placeholder='Enter your post here....'
                                   subscription={{
                                       value: true,
                                       error: true,
                                       touched: true
                                   }}
                            />
                            <div>
                                <button type='submit' disabled={submitting}>Add post</button>
                            </div>
                        </form>
                    )
                }}
            />
            <div className={classes.posts}>
                {postsElements}
            </div>
        </div>
    );
});

