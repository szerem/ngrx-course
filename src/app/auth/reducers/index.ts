import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on,
  State
} from '@ngrx/store';
// import { environment } from "../../../environments/environment";
import { AuthActions } from '../action.type';
import { login, logout } from '../auth.actions';
import { User } from '../model/user.model';

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined
};

// export const reducers: ActionReducerMap<AuthState> = {

// };


// export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];

export const authReducers = createReducer(

  initialAuthState,

  on(AuthActions.login, (state, action) => {
      // console.log('Calling login reducer');
      // console.log(state, action);
      // debugger;
      return {
          user: action.user
      };
  }),

  on(AuthActions.logout, (state, action) => {
      return {
          user: undefined
      };
  })


);

/*
obecny stan store
the action that was just dispatched (akcja ktora zostala wywolana)
nowy stan stora
function authReducers(state, action): State {}
*/
