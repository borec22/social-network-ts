import profileReducer, {setProfileStatus, setUserProfileData} from "./profile-reducer";
import {addPost, ProfileReducerInitialStateType} from "./profile-reducer";

test('when add post, post should be added', () => {
   const startState: ProfileReducerInitialStateType = {
      posts: [
         {id: 1, text: 'I love Ukraine.', likesCount: 10},
         {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ],
      status: 'React is the best!!!',
      userProfileData: null
   }

   const endState = profileReducer(startState, addPost('new post'));

   let post = endState.posts.find((post) => post.id !== 1 && post.id !== 2);

   if (!post) {
      throw new Error('new post should be added')
   }

   expect(endState.posts.length).toBe(3);
   expect(post).toBeTruthy();
})

test('user profile data, must be saved correctly', () => {
   const startState: ProfileReducerInitialStateType = {
      posts: [
         {id: 1, text: 'I love Ukraine.', likesCount: 10},
         {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ],
      status: 'React is the best!!!',
      userProfileData: null
   }

   const userProfileData = {
      fullName: 'Serhiy',
      lookingForAJobDescription: null,
      lookingForAJob: true,
      photos: {
         large: null,
         small: null
      },
      aboutMe: null,
      contacts: {
         youtube: null,
         website: null,
         vk: null,
         twitter: null,
         mainLink: null,
         instagram: null,
         github: null,
         facebook: null
      },
      userId: 13768
   }

   const endState = profileReducer(startState, setUserProfileData(userProfileData));

   expect(endState.userProfileData).toStrictEqual(userProfileData);
})

test('profile status mush be changed', () => {
   const startState: ProfileReducerInitialStateType = {
      posts: [
         {id: 1, text: 'I love Ukraine.', likesCount: 10},
         {id: 2, text: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
      ],
      status: 'React is the best!!!',
      userProfileData: null
   }

   const status = 'Hello World!'

   const endState = profileReducer(startState, setProfileStatus(status));

   expect(endState.status).toBe(status);
})


