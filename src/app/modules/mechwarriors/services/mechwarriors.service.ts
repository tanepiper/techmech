import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Mechwarrior } from '../models/mechwarriors';

import { selectAllMechwarriors } from '../store';
import * as mechwarriorActions from '../store/mechwarriors.actions';
import { tap } from 'rxjs/operators';

/* tslint:disable */
function generateUID() {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  let firstPart: string | number = (Math.random() * 46656) | 0;
  let secondPart: string | number = (Math.random() * 46656) | 0;
  firstPart = ('000' + firstPart.toString(36)).slice(-3);
  secondPart = ('000' + secondPart.toString(36)).slice(-3);
  return `${firstPart}${secondPart}`;
}
/* tslint:enable */

@Injectable()
export class MechwarriorsService {
  @LocalStorage() mechwarriorGroups: Mechwarrior[] = [];

  constructor(private store: Store<Mechwarrior[]>) {
    this.store.dispatch(new mechwarriorActions.AddAllMechwarriors(this.mechwarriorGroups));
  }

  addMechwarrior(newMechWarrior: Mechwarrior): void {
    const mechwarrior = { ...newMechWarrior, id: generateUID() };
    this.mechwarriorGroups.push(mechwarrior);
    this.store.dispatch(new mechwarriorActions.AddMechwarrior(mechwarrior));
  }

  updateMechwarrior(updatedMechwarrior: any): void {
    this.mechwarriorGroups = this.mechwarriorGroups.map(
      (mechwarrior, index) => (mechwarrior.id === updatedMechwarrior.id ? updatedMechwarrior : mechwarrior)
    );
    this.store.dispatch(new mechwarriorActions.UpdateMechwarrior(updatedMechwarrior));
  }

  deleteMechwarrior(deleteMechwarrior: Mechwarrior): void {
    this.mechwarriorGroups = this.mechwarriorGroups.filter(mechwarrior => mechwarrior.id !== deleteMechwarrior.id);
    this.store.dispatch(new mechwarriorActions.DeleteMechwarrior(deleteMechwarrior));
  }

  getAllMechwarriors(): Observable<Mechwarrior[]> {
    return this.store.pipe(select('mechwarriors'));
  }
}
