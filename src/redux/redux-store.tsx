import {dialogsReducer} from './dialogs-reducer';
import {profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {combineReducers, createStore} from 'redux'
import {usersReducer} from './users-reducer';

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer
});

export const store = createStore(reducers);

export type StateType = ReturnType<typeof store.getState>


