import classes from './Post.module.css';
import React from 'react';

type PropsType = {
    message: string
    likesCount: number
}

export const Post:React.FC<PropsType> = React.memo((props) => {
    console.log('Render Post')
    return (
        <div className={classes.post}>
            <img src="https://encrypted-tbn0.gstatic.com/
            images?q=tbn%3AANd9GcTvnViPfsS_1xh3mZLhMD7erA9qzqnKSamuSA&usqp=CAU"
                 alt="photo" className={classes.photo}/>
            {props.message}
            <div>
                <span>{`${props.likesCount} likes`}</span>
            </div>
        </div>
    );
});