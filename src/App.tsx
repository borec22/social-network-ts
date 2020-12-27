import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {ActionsType} from './redux/store';
import {DialogsContainer} from './components/Dialogs/DialogsContainer';

type AppType = {
   state: any
   dispatch: (action: ActionsType) => void
   store: any
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Route path='/profile'
                   render={() => <Profile store={props.store} />}/>
            <Route path='/dialogs'
                   render={() => <DialogsContainer store={props.store} />}/>
         </div>
      </div>
   );
}

export default App;
