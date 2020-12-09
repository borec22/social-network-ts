import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {ActionsType, StateType} from './redux/store';

type AppType = {
   state: StateType
   dispatch: (action: ActionsType) => void
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Route path='/profile'
                   render={() => <Profile profilePage={props.state.profilePage}
                                          dispatch={props.dispatch}/>}/>
            <Route path='/dialogs'
                   render={() => <Dialogs dialogsPage={props.state.dialogsPage}
                                          dispatch={props.dispatch}
                                          newMessageText={props.state.dialogsPage.newMessageText}/>}/>
         </div>
      </div>
   );
}

export default App;
