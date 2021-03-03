import React, {useEffect} from 'react';
import {Preloader} from '../../common/preloader/Preloader';
import {UserType} from "../../api/api";
import {Paginator} from "../../common/paginator/Paginator";
import {User} from "./User/User";

type PropsType = {
    users: Array<UserType>
    follow: (userId: number) => void
    unFollow: (userId: number) => void
    pageSize: number,
    page: number,
    totalCount: number,
    isFetching: boolean,
    setPage: (page: number) => void
    followingInProgress: Array<number>
    setFollowingInProgress: (isFetching: boolean, userId: number) => void
    requestUsers: (currentPage: number, pageSize: number) => void
}

export const Users: React.FC<PropsType> = React.memo((props) => {
    const {users, totalCount, pageSize, page, setPage, isFetching, followingInProgress} = props;

    useEffect(() => {
        props.requestUsers(props.page, props.pageSize);
    }, [page, pageSize]);


    const followHandler = (userId: number) => props.follow(userId);

    const unFollowHandler = (userId: number) => props.unFollow(userId);

    return (
        <>
            {isFetching && <Preloader/>}
            {users.map(user => <User key={user.id}
                                     follow={followHandler}
                                     unfollow={unFollowHandler}
                                     followingInProgress={followingInProgress}
                                     {...user}/>)}
            <Paginator totalItemsCount={totalCount} pageSize={pageSize} setPage={setPage} page={page} portionSize={10    }/>
        </>
    );
});