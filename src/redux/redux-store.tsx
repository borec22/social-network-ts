import dialogsReducer, {ActionsDialogsType} from './dialogs-reducer';
import profileReducer, {ActionsProfileType} from './profile-reducer';
import {sidebarReducer} from './sidebar-reducer';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import thunk from 'redux-thunk';
import {ActionsUsersReducersTypes, usersReducer} from './users-reducer';
import authReducer, {ActionsAuthReducersTypes} from './auth-reducer';
import appReducer, {ActionsAppReducersTypes} from "./app-reducer";

let rootReducer = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   usersPage: usersReducer,
   sidebar: sidebarReducer,
   auth: authReducer,
   app: appReducer,
});

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// @ts-ignore
window.store = store;

export type StateType = ReturnType<typeof rootReducer>

export type AppActionType = ActionsAuthReducersTypes  | ActionsUsersReducersTypes | ActionsDialogsType |
    ActionsProfileType | ActionsAppReducersTypes;


