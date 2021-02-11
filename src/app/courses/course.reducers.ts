import { compareCourses, Course } from './model/course';
import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { CourseActions } from './action.type';

export interface CoursesState extends EntityState<Course> {

  allCoursesLoaded: boolean;
  // extends EntityState zamiast// // dictionary
  // entities: { [key: number]: Course };
  // ids: number[];
  // zamiast
  // courses: Course[]
}

export const adapter = createEntityAdapter<Course>(
  {
    sortComparer: compareCourses,
    // selectId: (course) => course.id <-- niemusimy jezeli id jest klucz em
  }
);

export const initialCoursesState = adapter.getInitialState(
  {allCoursesLoaded: false}
);

export const coursesReducers = createReducer(

  initialCoursesState,

  on(CourseActions.allCoursesLoaded,
    (state, action) => adapter.addAll(
      action.courses, {...state, allCoursesLoaded: true }
    )
  ),

  on(CourseActions.courseUpdated,
    (state, action) => {
      return adapter.updateOne(action.update, state);
    }
  ),

);


export const {selectAll } = adapter.getSelectors();
