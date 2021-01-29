import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

// moze byc unikalny string np Login Action ale lepszym rozwiazaniem jest uzycie konwencji
// [zrodla akcji w aplikacji] event/command, payload
export const login = createAction(
  "[Login Page] User Login",
  props<{user: User}>()
);


export const logout = createAction(
  "[Top Menu] Logout",
);
