import {AppActionType, StateType} from './redux-store';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {auth} from "./auth-reducer";

enum ActionsType {
    INITIALIZED_APP = 'APP/INITIALIZED_APP',
}

const initialState = {
    isInitializedApp: false as boolean
}


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


// actions
const initializedSuccess = () => ({
    type: ActionsType.INITIALIZED_APP
}) as const;


// thunks
export const initialize = (): ThunkAction<void, StateType, unknown, AppActionType> =>
    async (dispatch: ThunkDispatch<StateType, unknown, AppActionType>) => {
        const promise = dispatch(auth());

        await Promise.all([promise]);

        dispatch(initializedSuccess())
    }


// types
export type AppInitialStateType = typeof initialState;
export type ActionsAppReducersTypes = ReturnType<typeof initializedSuccess>;