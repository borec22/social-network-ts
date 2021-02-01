import React from 'react';
import {sendMessage, updateMessageText} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';

const mapStateToProps = (state: StateType) => ({
   newMessageText: state.dialogsPage.newMessageText,
   dialogs: state.dialogsPage.dialogs,
   messages: state.dialogsPage.messages
});

export const DialogsContainer = withAuthRedirect(connect(mapStateToProps, {sendMessage, updateMessageText})(Dialogs));