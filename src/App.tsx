import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {StateType} from './redux/state';

type AppType = {
   state: StateType
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Route path='/profile' render={() => <Profile profilePage={props.state.profilePage}/>}/>
            <Route path='/dialogs'
                   render={() => <Dialogs dialogsPage={props.state.dialogsPage}/>}/>
         </div>
      </div>
   );
}

export default App;
