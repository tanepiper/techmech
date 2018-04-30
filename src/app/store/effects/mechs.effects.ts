import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as mechActions from '../actions';
import { AppService } from '../../services/app.service';

@Injectable()
export class MechsEffects {
  constructor(private actions$: Actions, private api: AppService) {}

  @Effect()
  loadMechs$ = this.actions$.ofType(mechActions.LOAD_MECHS).pipe(
    exhaustMap(() => {
      return this.api
        .getMechList()
        .pipe(
          map(payload => new mechActions.LoadMechsSuccess(payload)),
          catchError(error => of(new mechActions.LoadMechsFail(error)))
        );
    })
  );
}
