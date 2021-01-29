import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import { AuthState } from '../reducers';
import { login } from '../auth.actions';
import { AuthActions } from '../action.type';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store:Store<AuthState>
      ) {

      this.form = fb.group({
          email: ['test@angular-university.io', [Validators.required]],
          password: ['test', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  login() {
    const val : { email: string, password: string } = this.form.value ;
    // console.log(val); //login.component.ts:38 {email: "test@angular-university.io", password: "test"}
    this.auth.login(val.email, val.password)
      .pipe(
        tap(user => {
            console.log(user);
            // this.store.dispatch({
            //    type: 'Login Action',
            //    payload: {
            //      userProfile: user
            //    }
            // });
            // zamiast:
            // this.store.dispatch(login({user:user}));
            // zamiast:
            this.store.dispatch(login({user}));

            this.router.navigateByUrl('/courses');
        })
      )
      .subscribe(
        noop,
        () => alert('Login Failed')
      );

  }

}

