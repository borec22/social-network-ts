import {AppActionType, StateType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {auth} from "./auth-reducer";

enum ActionsType {
    INITIALIZED_APP = 'APP/INITIALIZED_APP',
}

export type AppInitialStateType = {
    isInitializedApp: boolean
}

const initialState: AppInitialStateType = {
    isInitializedApp: false
}

export type ActionsAppReducersTypes = ReturnType<typeof initializedSuccess>;


export default function appReducer(state = initialState, action: ActionsAppReducersTypes): AppInitialStateType {
    switch (action.type) {
        case ActionsType.INITIALIZED_APP: {
            return {...state, isInitializedApp: true}
        }
        default: {
            return state;
        }
    }
}


const initializedSuccess = () => ({
    type: ActionsType.INITIALIZED_APP
}) as const;


export const initialize = (): ThunkAction<void, StateType, unknown, AppActionType> =>
    async (dispatch: ThunkDispatch<StateType, unknown, AppActionType>) => {
        const promise = dispatch(auth());

        await Promise.all([promise]);

        dispatch(initializedSuccess())
    }