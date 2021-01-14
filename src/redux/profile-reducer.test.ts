import {addPostAC, profileReducer, updatePostTextAC} from './profile-reducer';

test('when add post, post should be added', () => {
   const startState = {
      posts: [
         {id: 1, message: 'I love Ukraine.', likesCount: 10},
         {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ],
      newPostText: ''
   }

   const endState = profileReducer(startState, addPostAC());

   let post = endState.posts.find((post) => post.id !== 1 && post.id !== 2);

   if (!post) {
      throw new Error('new post should be added')
   }

   expect(endState.posts.length).toBe(3);
   expect(post).toBeTruthy();
})

test('when update text of post, text should be changed', () => {
   const startState = {
      posts: [
         {id: 1, message: 'I love Ukraine.', likesCount: 10},
         {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ],
      newPostText: ''
   }

   const endState = profileReducer(startState, updatePostTextAC('I love Ukraine too much'));

   expect(endState.newPostText).toBe('I love Ukraine too much');
})