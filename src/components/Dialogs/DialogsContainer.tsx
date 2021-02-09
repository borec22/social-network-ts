import React, {ComponentType} from 'react';
import {sendMessage} from '../../redux/dialogs-reducer';
import {Dialogs} from './Dialogs';
import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {withAuthRedirect} from '../../hocs/withAuthRedirect';
import {compose} from 'redux';

const mapStateToProps = (state: StateType) => ({
   dialogs: state.dialogsPage.dialogs,
   messages: state.dialogsPage.messages
});

export default compose<ComponentType>(
   withAuthRedirect,
   connect(mapStateToProps, {sendMessage})
)(Dialogs);

