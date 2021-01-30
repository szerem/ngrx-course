import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { AuthActions } from './action.type';

@Injectable()
export class AuthEffects {

  login$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.login),
        tap(action => localStorage.setItem('user', JSON.stringify(action.user)))
      )
    , {dispatch: false} // bradzo wazne !!!
  );


  logout$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(AuthActions.logout),
        tap(action => {
          localStorage.removeItem('user');
          this.router.navigateByUrl('/login');
        }),
      )
    , {dispatch: false} // bradzo wazne !!!
  );

  constructor(private actions$: Actions, private router: Router) {


    // zamiast
    // const login$ = this.actions$
    //   .pipe(
    //     ofType(AuthActions.login),
    //     tap(action => {
    //       localStorage.setItem('user',
    //         JSON.stringify(action.user)
    //       );
    //     })
    //   );
    // login$.subscribe();

    // zamiast
    // actions$.subscribe(action => {
    //   console.log('AuthEffects.constructor', action);
    //   if (action.type === '[Login Page] User Login') {
    //     localStorage.setItem('user', JSON.stringify(action['user']));
    //   }
    // });
  }
}
