import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { AuthService } from './auth/auth.service';
// import { logout } from './auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AppState>, private auth : AuthService) {
    }

    ngOnInit() {
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
        map(state => !!state["auth"].user),
        // tap(data => console.log("AAAAAAAAAAA", data))
      )
      ;

      this.isLoggedOut$ = this.store
      .pipe(
        map(state => !state["auth"].user),
      )
      ;

      this.store.subscribe(state => console.log('Moj stan', state));

    }

    logout() {
      // this.store.dispatch(logout());
    }

}




//  this.auth.login(val.email, val.password)
//       .pipe(
//         tap(user => {
//             console.log(user);
//             // this.store.dispatch({
//             //    type: 'Login Action',
//             //    payload: {
//             //      userProfile: user
//             //    }
//             // });
//             // zamiast:
//             // this.store.dispatch(login({user:user}));
//             // zamiast:
//             this.store.dispatch(login({user}));

//             this.router.navigateByUrl('/courses');
//         })
//       )
//       .subscribe(
//         noop,
//         () => alert('Login Failed')
//       );
