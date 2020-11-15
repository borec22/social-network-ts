import React from 'react';
import './App.css';
import {Header} from './components/Header/Header';
import {Navbar} from './components/Navbar/Navbar';
import {Profile} from './components/Profile/Profile';
import {Dialogs} from './components/Dialogs/Dialogs';
import {Route} from 'react-router-dom';
import {DialogType, MessageType, PostType} from './index';

type AppType = {
   postsData: Array<PostType>
   messagesData: Array<MessageType>
   dialogsData: Array<DialogType>
}

function App(props: AppType) {
   return (
      <div className='appWrapper'>
         <Header/>
         <Navbar/>
         <div className='appWrapperContent'>
            <Route path='/profile' render={() => <Profile postsData={props.postsData}/>}/>
            <Route path='/dialogs'
                   render={() => <Dialogs dialogsData={props.dialogsData} messagesData={props.messagesData}/>}/>
         </div>
      </div>
   );
}

export default App;
