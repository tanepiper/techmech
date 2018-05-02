import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';

import { Mechwarrior } from '../models/mechwarriors';
import { Subject, BehaviorSubject } from 'rxjs';

import * as MechwarriorsStore from '../store';
import { tap } from 'rxjs/operators';

@Injectable()
export class MechwarriorsService {
  @LocalStorage() mechwarriorGroups: Mechwarrior[] = [];

  constructor(private store: Store<Mechwarrior[]>) {
    this.store.dispatch(new MechwarriorsStore.AddAllMechwarriors(this.mechwarriorGroups));
  }

  addMechwarrior(newMechWarrior: Mechwarrior): void {
    const mechwarrior = { ...newMechWarrior, id: this.mechwarriorGroups.length };
    this.mechwarriorGroups.push(mechwarrior);
    this.store.dispatch(new MechwarriorsStore.AddMechwarrior(mechwarrior));
  }

  updateMechwarrior(updatedMechwarrior: any): void {
    this.mechwarriorGroups = this.mechwarriorGroups.map((mechwarrior, index) => {
      if (mechwarrior.id === updatedMechwarrior.id) {
        mechwarrior = updatedMechwarrior;
      }
      return mechwarrior;
    });
    this.store.dispatch(new MechwarriorsStore.UpdateMechwarrior(updatedMechwarrior));
  }

  deleteMechwarrior(deleteMechwarrior: Mechwarrior): void {
    this.mechwarriorGroups = this.mechwarriorGroups.filter(mechwarrior => mechwarrior.id !== deleteMechwarrior.id);
    this.store.dispatch(new MechwarriorsStore.DeleteMechwarrior(deleteMechwarrior));
  }

  getAllMechwarriors(): Observable<Mechwarrior[]> {
    return this.store.pipe(
      select('mechwarriors'),
      // tap(data => console.log(data))
    );
  }
}
