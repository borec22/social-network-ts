import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Redirect, Route, Switch} from 'react-router-dom';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import {UsersContainer} from './components/Users/UsersContainer';
import {ProfileContainer} from './components/Profile/ProfileContainer';
import Error404 from './components/Error404/Error404';
import HeaderContainer from './components/Header/HeaderContainer';
import {Login} from './components/Login/Login';

type AppType = {}

export const PATH = {
   PROFILE: '/profile/:userId?',
   DIALOGS: '/dialogs',
   USERS: '/users',
   LOGIN: '/login',
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <HeaderContainer/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Switch>
               <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

               <Route path={PATH.PROFILE} render={() => <ProfileContainer/>}/>

               <Route path={PATH.DIALOGS} render={() => <DialogsContainer/>}/>
               
               <Route path={PATH.USERS} render={() => <UsersContainer/>}/>

               <Route path={PATH.LOGIN} render={() => <Login/>}/>

               <Route render={() => <Error404/>}/>
            </Switch>
         </div>
      </div>
   );
}

export default App;
