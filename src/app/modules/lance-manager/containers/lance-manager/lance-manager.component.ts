import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { FormBuilder, FormGroup } from '@angular/forms';

import { SettingsService } from '../../../settings/services/settings.service';
import { SettingsGroup } from '../../../settings/models/setting';
import { LanceManagerService } from '../../services/lance-manager.service';
import { Lance } from '../../models/lance-manager';

import * as lanceManagerStore from '../../store';
import { take } from 'rxjs/operator/take';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { selectAllLances } from '../../store';

@Component({
  selector: 'tm-lance-manger-container',
  styleUrls: ['lance-manager.component.scss'],
  template: `
  <div class="row">
    <div class="col">
      <tm-lance-manager-header (newLance)="onNewLance($event)" (updateControls)="onUpdateControls($event)"></tm-lance-manager-header>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let lance of displayLances; let i = index">
            <tm-lance-list-item [lance]="lance" (deleteLance)="onDeleteLance($event)"
              (updateLance)="onUpdateLance($event)"></tm-lance-list-item>
        </ul>
      </div>
    </div>
  </div>
  `
})
export class TMLanceManagerComponent implements OnInit {
  settings$: Observable<SettingsGroup>;

  lances$: Observable<Lance[]>;

  displayLances: Lance[];

  lanceForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private lanceService: LanceManagerService,
    private store: Store<Lance[]>,
    private fb: FormBuilder
  ) {
    this.settings$ = this.settingsService.getSettings();
    this.displayLances = [];
  }

  ngOnInit() {
    this.lances$ = this.lanceService.getAllLances();
    const getData = this.lances$.subscribe(
      (data: any) => (this.displayLances = Object.keys(data.lances.entities).map(i => data.lances.entities[i])),
      error => {
        console.log(error);
      },
      () => getData.unsubsribe()
    );
  }

  onSubmit() {
    this.lanceService.updateLance(this.lanceForm.value);
  }

  onUpdateControls({ searchQuery }) {
    let thisIsBad;
    console.log(searchQuery);
    if (searchQuery === '') {
      thisIsBad = this.lances$.subscribe(
        (data: any) => (this.displayLances = Object.keys(data.lances.entities).map(i => data.lances.entities[i])),
        error => {
          console.log(error);
        },
        () => thisIsBad.unsubsribe()
      );
    } else {
      thisIsBad = this.lances$.subscribe(
        (data: any) =>
          (this.displayLances = Object.keys(data.lances.entities)
            .map(i => data.lances.entities[i])
            .filter(lance => lance.name.toLowerCase().includes(searchQuery.toLowerCase()))),
        error => {
          console.log(error);
        },
        () => thisIsBad.unsubsribe()
      );
    }
  }

  onNewLance(event) {
    event.preventDefault();
    this.lanceService.addLance({
      /** TODO: Turn this into flavour text via a data service */
      name: 'Techmech Raptors',
      description: 'A battle hardend lance that dishes out gunishment',
      mechs: [],
      mechwarriors: [{
        name: 'Titus',
        stats: {}
      }]
    });
  }

  onUpdateLance(lance) {
    this.lanceService.updateLance(lance);
  }

  onDeleteLance(lance) {
    this.lanceService.deleteLance(lance);
  }
}
