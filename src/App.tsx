import React, {useEffect} from 'react';
import {BrowserRouter, HashRouter, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';

import Error404 from './components/Error404/Error404';
import {Navbar} from './components/Navbar/Navbar';
import HeaderContainer from './components/Header/HeaderContainer';
import {Provider, useDispatch, useSelector} from "react-redux";
import {StateType, store} from "./redux/redux-store";
import {Preloader} from "./common/preloader/Preloader";
import {initialize} from "./redux/app-reducer";
import {Login} from './components/Login/Login';
import {withSuspense} from "./hocs/withSuspense";

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const UsersContainer = React.lazy(() => import('./components/Users/UsersContainer'));
// const Login = React.lazy(() => import('./components/Login/Login'));

type AppType = {}

const SuspendedDialogs = withSuspense(DialogsContainer)
const SuspendedProfile = withSuspense(ProfileContainer)
const SuspendedUsers = withSuspense(UsersContainer)

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
                    <Route path={'/'} exact render={() => <Redirect to={'/profile'}/>}/>

                    <Route path={'/profile/:userId?'} render={() => <SuspendedProfile/>}/>

                    <Route path={'/dialogs'} render={() => <SuspendedDialogs/>}/>

                    <Route path={'/users'} render={() => <SuspendedUsers/>}/>

                    <Route path={'/login'} render={() => <Login/>}/>

                    <Route path={'/404'} render={() => <Error404/>}/>

                    <Route path={'*'} render={() => <Redirect to={'/404'}/>}/>

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
