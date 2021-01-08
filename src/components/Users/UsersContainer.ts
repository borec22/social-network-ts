import {connect} from 'react-redux';
import {StateType} from '../../redux/redux-store';
import {follow, setUsers, unFollow, UserType} from '../../redux/users-reducer';
import {Users} from './Users';

const mapStateToProps = (state: StateType) => ({
   users: state.usersPage.users
})

const mapDispatchToProps = (dispatch: any) => ({
   follow: (userId: number) => dispatch(follow(userId)),
   unFollow: (userId: number) => dispatch(unFollow(userId)),
   setUsers: (users: Array<UserType>) => dispatch(setUsers(users)),
})

export const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);