import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable ,  of } from 'rxjs';
import { catchError, switchMap, take, tap } from 'rxjs/operators';
import * as appModels from '../models';
import * as appStore from '../store';


@Injectable()
export class MechBuilderGuard implements CanActivate {
  constructor(private store: Store<appModels.MechsState>) {}

  getData(): Observable<any> {
    console.log('called');
    return this.store.pipe(
      select(appStore.getMechs),
      tap((state: appModels.MechsState) => {
        console.log(state);
        if (!state.loaded) {
          this.store.dispatch(new appStore.LoadMechs());
        }
      }),
      take(1)
    );
  }

  canActivate(): Observable<boolean> {
    console.log('Can Activete?');
    return this.getData().pipe(switchMap(() => of(true)), catchError(error => of(error)));
  }
}
