import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Store, select } from '@ngrx/store';

import { Lance } from '../models/lance-manager';
import { Subject, BehaviorSubject } from 'rxjs';

import * as lanceManagerStore from '../store';
import { tap } from 'rxjs/operators';

@Injectable()
export class LanceManagerService {
  @LocalStorage() lanceGroups: Lance[] = [];

  constructor(private store: Store<Lance[]>) {
    this.store.dispatch(new lanceManagerStore.AddAllLances(this.lanceGroups));
  }

  addLance(newLance: Lance): void {
    const lance = { ...newLance, id: this.lanceGroups.length };
    this.lanceGroups.push(lance);
    this.store.dispatch(new lanceManagerStore.AddLance(lance));
  }

  updateLance(updatedLance: any): void {
    this.lanceGroups = this.lanceGroups.map((lance, index) => {
      if (lance.id === updatedLance.id) {
        lance = updatedLance;
      }
      return lance;
    });
    this.store.dispatch(new lanceManagerStore.UpdateLance(updatedLance));
  }

  deleteLance(deleteLance: Lance): void {
    this.lanceGroups = this.lanceGroups.filter(lance => lance.id !== deleteLance.id);
    this.store.dispatch(new lanceManagerStore.DeleteLance(deleteLance));
  }

  getAllLances(): Observable<Lance[]> {
    return this.store.pipe(
      select('lances'),
    );
  }
}
