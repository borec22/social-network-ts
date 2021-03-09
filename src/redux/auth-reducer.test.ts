import authReducer, {InitialAuthStateType, setIsFetching, setLoginSummaryError, setUserData} from "./auth-reducer";

let startState: InitialAuthStateType;

beforeEach(() => {
   startState = {
      id: null,
      email: null,
      login: null,
      isFetching: false,
      isAuth: false,
      isSummaryError: false,
      errorMessage: ''
   }
})

describe('isFetching', () => {
   test('isFetching must be true, when setIsFetching in true', () => {

      const endState = authReducer(startState, setIsFetching(true));

      expect(endState.isFetching).toBeTruthy();
   })

   test('isFetching must be false, when setIsFetching in false', () => {

      const endState = authReducer(startState, setIsFetching(false));

      expect(endState.isFetching).toBeFalsy();
   })
})

test('user data must be set', () => {
   const endState = authReducer(startState, setUserData(1, 'romanchuk.sss22121999@gmail.com', 'serhiy', true));

   expect(endState.isAuth).toBeTruthy();
   expect(endState.email).toBe('romanchuk.sss22121999@gmail.com');
   expect(endState.id).toBe(1);
   expect(endState.login).toBe('serhiy');
})

test('summary error must be set', () => {
   const endState = authReducer(startState, setLoginSummaryError(true, 'login or password is incorrect'));

   expect(endState.isSummaryError).toBeTruthy();
   expect(endState.errorMessage).toBe('login or password is incorrect');
})

