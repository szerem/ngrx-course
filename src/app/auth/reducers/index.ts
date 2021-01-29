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
import { login } from '../auth.actions';

export interface AuthState {

}

export const initialAuthState: AuthState = {
  user: undefined
};

export const reducers: ActionReducerMap<AuthState> = {

};


// export const metaReducers: MetaReducer<AuthState>[] = !environment.production ? [] : [];

export const authReducers = createReducer(

  initialAuthState,

  on( login,
    (state, action) => {
      // console.log('Calling login reducer');
      // console.log(state, action);
      // debugger;
      return {
        user: action.user
      };
    }
  )
);

/*
obecny stan store
the action that was just dispatched (akcja ktora zostala wywolana)
nowy stan stora
function authReducers(state, action): State {}
*/
