import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

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
      <form class="card">
      <tm-lance-manager-header (newLance)="onNewLance($event)"></tm-lance-manager-header>

        <div class="card-body">
          <ul class="list-group">
            <li class="list-group-item" *ngFor="let lance of displayLances; let i = index">
            <tm-lance-list-item [lance]="lance" (deleteLance)="onDeleteLance($event)"></tm-lance-list-item>
          </ul>
        </div>
      </form>
    </div>
  </div>
  `
})
export class TMLanceManagerComponent implements OnInit {
  settings$: Observable<SettingsGroup>;

  lances$: Observable<Lance[]>;

  displayLances: Lance[];

  constructor(
    private settingsService: SettingsService,
    private lanceService: LanceManagerService,
    private store: Store<Lance[]>
  ) {
    this.settings$ = this.settingsService.getSettings();
  }

  ngOnInit() {
    this.lances$ = this.lanceService.getAllLances();
    this.lances$.subscribe((data: any) => (this.displayLances = Object.keys(data.lances.entities).map(i => data.lances.entities[i])));
    console.log(this.displayLances);
  }

  onNewLance(event) {
    event.preventDefault();
    this.lanceService.addLance({
      /** TODO: Turn this into flavour text via a data service */
      name: 'Techmech Raptors',
      description: 'A battle hardend lance that dishes out gunishment',
      mechs: [],
      mechwarriors: []
    });
  }

  onDeleteLance(lance) {
    // event.preventDefault();
    console.log(lance);
    this.lanceService.deleteLance(lance);
  }

  onUpdate(setting) {
    // this.settingsService.updateSetting(setting);
  }
}
