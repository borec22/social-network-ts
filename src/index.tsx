import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

export type PostType = {
   id: number
   message: string
   likesCount: number
}
export type DialogType = {
   id: number
   name: string
}
export type MessageType = {
   id: number
   message: string
}

let postsData: Array<PostType> = [
   {id: 1, message: 'I love Ukraine.', likesCount: 10},
   {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.', likesCount: 3},
];
let dialogsData: Array<DialogType> = [
   {id: 1, name: 'Andriy'},
   {id: 2, name: 'Serhiy'},
   {id: 3, name: 'Oleg'},
   {id: 4, name: 'Lesya'},
   {id: 5, name: 'Ira'},
];

let messagesData: Array<MessageType> = [
   {id: 1, message: 'Lorem ipsum dolor sit.'},
   {id: 2, message: 'Lorem ipsum is big dog cat dolor sit.'},
   {id: 3, message: 'Lorem ipsum mouse cat house dolor sit.'},
];

ReactDOM.render(
   <React.StrictMode>
      <BrowserRouter>
         <App  postsData={postsData} messagesData={messagesData} dialogsData={dialogsData} />
      </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
