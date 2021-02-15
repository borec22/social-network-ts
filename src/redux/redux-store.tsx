import {ActionsDialogsType, dialogsReducer} from './dialogs-reducer';
import {ActionsProfileType, profileReducer} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk';
import {ActionsUsersReducersTypes, usersReducer} from './users-reducer';
import {ActionsAuthReducersTypes, authReducer} from './auth-reducer';

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer,
   auth: authReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.store = store;

export type StateType = ReturnType<typeof reducers>

export type AppActionType = ActionsAuthReducersTypes  | ActionsUsersReducersTypes | ActionsDialogsType | ActionsProfileType;


