import {
   followSuccess, setFollowingInProgress, setIsFetching, setPage,
   setTotalCount,
   setUsers,
   unfollowSuccess,
   UsersInitialStateType,
   usersReducer
} from './users-reducer';

let startState: UsersInitialStateType;

beforeEach(() => {
   startState = {
      users: [
         {
            name: 'Alex',
            id: 1,
            uniqueUrlName: null,
            photos: {
               small: 'https://facebook.com/avatar-small',
               large: 'https://facebook.com/avatar-large'
            },
            status: 'Hello, world!',
            'followed': true
         },
         {
            name: 'Bob',
            id: 2,
            uniqueUrlName: null,
            photos: {
               small: 'https://facebook.com/avatar-small',
               large: 'https://facebook.com/avatar-large'
            },
            status: 'Hello, WORLD!',
            'followed': false
         }
      ],
      totalCount: 0,
      pageSize: 5,
      page: 1,
      isFetching: false,
      followingInProgress: [],
   }
})

test('follow on user, after followed user property "followed" should be true', () => {
   const endState = usersReducer(startState, followSuccess(2));

   expect(endState.users.length).toBe(2);
   expect(endState.users[0].followed).toBe(true);
   expect(endState.users[1].followed).toBe(true);
});

test('unfollow on user, after followed user property "followed" should be false', () => {
   const endState = usersReducer(startState, unfollowSuccess(1));

   expect(endState.users.length).toBe(2);
   expect(endState.users[0].followed).toBe(false);
   expect(endState.users[1].followed).toBe(false);
});

test('users must be added', () => {
   const endState = usersReducer({...startState, users: []}, setUsers([
      {
         name: 'Bob',
         id: 1,
         uniqueUrlName: null,
         photos: {
            small: 'https://facebook.com/avatar-small',
            large: 'https://facebook.com/avatar-large'
         },
         status: 'Hello, WORLD!',
         'followed': false
      },
      {
         name: 'Bob',
         id: 2,
         uniqueUrlName: null,
         photos: {
            small: 'https://facebook.com/avatar-small',
            large: 'https://facebook.com/avatar-large'
         },
         status: 'Hello, WORLD!',
         'followed': false
      },
      {
         name: 'Bob',
         id: 3,
         uniqueUrlName: null,
         photos: {
            small: 'https://facebook.com/avatar-small',
            large: 'https://facebook.com/avatar-large'
         },
         status: 'Hello, WORLD!',
         'followed': false
      }
   ]));

   expect(endState.users.length).toBe(3);
});

test('total count of users must be set', () => {
   const endState = usersReducer(startState, setTotalCount(100));

   expect(endState.totalCount).toBe(100);
});

test('current page must be set', () => {
   const endState = usersReducer(startState, setPage(2));

   expect(endState.page).toBe(2);
});

test('isFetching must be true', () => {
   const endState = usersReducer(startState, setIsFetching(true));

   expect(endState.isFetching).toBeTruthy();
});

test('to array followingInProgress must be added id', () => {
   const endState = usersReducer(startState, setFollowingInProgress(true, 5));

   expect(endState.followingInProgress.length).toBe(1);
   expect(endState.followingInProgress[0]).toBe(5);
});

test('in array followingInProgress must be deleted id', () => {
   const endState = usersReducer(startState, setFollowingInProgress(false, 5));

   expect(endState.followingInProgress.length).toBe(0);
});