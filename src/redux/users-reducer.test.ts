import {follow, setUsers, unFollow, usersReducer} from './users-reducer';

test('follow on user, after followed user property "followed" should be true', () => {
   const startState = {
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
      ]
   }

   const endState = usersReducer(startState, follow(2));

   expect(endState.users.length).toBe(2);
   expect(endState.users[0].followed).toBe(true);
   expect(endState.users[1].followed).toBe(true);
});

test('unfollow on user, after followed user property "followed" should be false', () => {
   const startState = {
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
         }
      ]
   }

   const endState = usersReducer(startState, unFollow(1));

   expect(endState.users.length).toBe(2);
   expect(endState.users[0].followed).toBe(false);
   expect(endState.users[1].followed).toBe(false);
});

test('set users to state property "users"', () => {
   const startState = {
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
         }
      ]
   }

   const endState = usersReducer(startState, setUsers([
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