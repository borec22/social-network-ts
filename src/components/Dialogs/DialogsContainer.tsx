import React from 'react';
import {sendMessage, updateMessageText} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';

const mapStateToProps = (state: StateType) => ({
   newMessageText: state.dialogsPage.newMessageText,
   dialogs: state.dialogsPage.dialogs,
   messages: state.dialogsPage.messages,
   isAuth: state.auth.isAuth
});

export const DialogsContainer = connect(mapStateToProps, {sendMessage, updateMessageText})(Dialogs);