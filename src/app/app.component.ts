import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { AuthService } from './auth/auth.service';
import { isLoggedIn, isLoggedOut } from './auth/auth.selectors';
import { login, logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>, private auth: AuthService) {
    }

    ngOnInit() {
      const userProfile = localStorage.getItem('user');
      if (userProfile) {
        this.store.dispatch(login({user: JSON.parse(userProfile)}));
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store
      .pipe(
        select(isLoggedIn)
        // zamiast
        // select(state => !!state["auth"].user),
        // zamiast
        // map(state => !!state["auth"].user)

        // ,tap(data =>
        // ("AAAAAAAAAAA", data))
      )
      ;

      this.isLoggedOut$ = this.store
      .pipe(
        select(isLoggedOut),
      );

      this.store.subscribe(state => console.log('AppComponent.ngOnInit store.state', state));

    }

    logout() {
      this.store.dispatch(logout());
    }

}
