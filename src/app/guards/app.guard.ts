import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { tap, take, switchMap, catchError } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';

import * as appStore from '../store';
import * as appModels from '../models';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(private store: Store<appModels.MechsState>) {}

  getData(): Observable<any> {
    return this.store.pipe(
      select(appStore.getMechs),
      tap((state: appModels.MechsState) => {
        if (!state.loaded) {
          this.store.dispatch(new appStore.LoadMechs());
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    return this.getData().pipe(switchMap(() => of(true)), catchError(error => of(error)));
  }
}
