import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Redirect, Route, Switch} from 'react-router-dom';
import {ActionsType} from './redux/store';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';
import Error404 from './components/Error404/Error404';

type AppType = {}

export const PATH = {
   PROFILE: '/profile',
   DIALOGS: '/dialogs',
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Switch>
               <Route path={'/'} exact render={() => <Redirect to={PATH.PROFILE}/>}/>

               <Route path={PATH.PROFILE} render={() => <Profile/>}/>

               <Route path={PATH.DIALOGS} render={() => <DialogsContainer/>}/>

               <Route render={() => <Error404/>}/>
            </Switch>
         </div>
      </div>
   );
}

export default App;
