import { CoursesHttpService } from './../services/courses-http.service';
import { tap, concatMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CourseActions } from './action.type';
import { allCoursesLoaded } from './course.actions';

@Injectable()
export class CourseEffects {


    loadCourses$ = createEffect(
      () => this.actions$
          .pipe(
            ofType(CourseActions.loadAllCourses),
            concatMap(action => this.coursesHttpService.findAllCourses()),
            map(courses => allCoursesLoaded({courses}))
          )
    );

  constructor(private actions$: Actions, private coursesHttpService: CoursesHttpService, private router: Router) {
  }
}
