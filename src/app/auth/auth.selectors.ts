import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./reducers";


export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const isLoggedIn = createSelector(
  selectAuthState,
  auth => !!auth.user
);
// zamiast
// export const isLoggedIn = createSelector(
//   state => state["auth"],
//   (auth) =>  !!auth.user
// );


export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !isLoggedOut
);
// zamiast
// export const isLoggedOut = createSelector(
//   state => state["auth"],
//   (auth) =>  !auth.user
// );
