import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import { AppService } from '../../services/app.service';
import * as mechBuilderActions from '../actions';


@Injectable()
export class MechBuilderEffects {
  constructor(private actions$: Actions, private api: AppService) {}

  @Effect()
  data$: Observable<Action> = this.actions$.ofType(mechBuilderActions.LOAD_MECHS).pipe(
    tap(() => console.log('called here too')),
    exhaustMap(() => {
      console.log('Hey, we got here');
      return this.api
        .getMechList()
        .pipe(
          map(payload => new mechBuilderActions.LoadMechsSuccess(payload)),
          catchError(error => of(new mechBuilderActions.LoadMechsFail(error)))
        );
    }),
    catchError(error => {
      console.log(error);
      return of(error);
    })
  );
}
