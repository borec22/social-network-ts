import React, {useEffect} from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import {Login} from './components/Login/Login';
import Error404 from './components/Error404/Error404';
import {Navbar} from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import {Provider, useDispatch, useSelector} from "react-redux";
import {StateType, store} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {initialize} from "./redux/app-reducer";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));

type AppType = {}

export const PATH = {
    PROFILE: '/profile',
    PROFILE_USER: '/profile/:userId?',
    DIALOGS: '/dialogs',
    USERS: '/users',
    LOGIN: '/login',
    ERROR404: '/404',
    NOT_FOUND: '*'
}

function App(props: AppType) {
    const dispatch = useDispatch();

    const isInitializedApp = useSelector<StateType, boolean>(state => state.app.isInitializedApp);

    useEffect(() => {
        dispatch(initialize());
    }, [])

    if (!isInitializedApp) {
        return <Preloader/>
    }

    return (
        <div className='appWrapper'>
            <HeaderContainer/>
            <Navbar/>
            <div className='appWrapperContent'>
                <Switch>
                    <React.Suspense fallback={<Preloader/>}>
                        <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

                        <Route path={PATH.PROFILE_USER} render={() => <ProfileContainer/>}/>

                        <Route path={PATH.PROFILE} render={() => <ProfileContainer/>}/>

                        <Route path={PATH.DIALOGS} render={() => <DialogsContainer/>}/>

                        <Route path={PATH.USERS} render={() => <UsersContainer/>}/>

                        <Route path={PATH.LOGIN} render={() => <Login/>}/>

                        <Route path={PATH.ERROR404} render={() => <Error404/>}/>

                        <Route path={PATH.NOT_FOUND} render={() => <Redirect to={PATH.ERROR404}/>}/>
                    </React.Suspense>
                </Switch>
            </div>
        </div>
    );
}


export default () => {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        </React.StrictMode>
    )
};
