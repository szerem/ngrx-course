import { createSelector } from "@ngrx/store";

export const isLoggedIn = createSelector(
  state => state["auth"],
  (auth) =>  !!auth.user
);


export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !isLoggedOut
);
// zamiast
// export const isLoggedOut = createSelector(
//   state => state["auth"],
//   (auth) =>  !auth.user
// );
