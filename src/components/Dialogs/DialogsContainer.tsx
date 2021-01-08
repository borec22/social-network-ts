import React from 'react';
import {sendMessageAC, updateMessageTextAC} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';

const mapStateToProps = (state: StateType) => ({
   newMessageText: state.dialogsPage.newMessageText,
   dialogs: state.dialogsPage.dialogs,
   messages: state.dialogsPage.messages,
});

const mapDispatchToProps = (dispatch: any) => ({
   sendMessage: () => dispatch(sendMessageAC()),
   changeMessageText: (text: string) => dispatch(updateMessageTextAC(text)),
})

export const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);