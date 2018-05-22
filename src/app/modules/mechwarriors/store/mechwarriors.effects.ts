import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import { MechwarriorsService } from '../services/mechwarriors.service';
import * as mechwarriorActions from '../store/mechwarriors.actions';

@Injectable()
export class MechwarriorEffects {
  constructor(private actions$: Actions, private service: MechwarriorsService) {}

  @Effect()
  $loadMechwarriors = this.actions$.ofType(mechwarriorActions.LOAD_MECHWARRIORS).pipe(
    exhaustMap(() => {
      return this.service
        .getAllMechwarriors()
        .pipe(
          map(data => new mechwarriorActions.AddAllMechwarriors({ mechwarriors: data })),
          catchError(error => of(error))
        );
    })
  );
}

export const effects: any[] = [MechwarriorEffects];
