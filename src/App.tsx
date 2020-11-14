import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';

function App() {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Route path='/profile' render={() => <Profile/>}/>
            <Route path='/dialogs' render={() => <Dialogs/>}/>
         </div>
      </div>
   );
}

export default App;
