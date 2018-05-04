import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable ,  of ,  Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { FormBuilder, FormGroup } from '@angular/forms';

import { SettingsService } from '../../../settings/services/settings.service';
import { SettingsGroup } from '../../../settings/models/setting';
import { LanceManagerService } from '../../services/lance-manager.service';
import { Lance } from '../../models/lance-manager';

import * as lanceManagerStore from '../../store';

import { tap, switchMap, map ,  takeUntil } from 'rxjs/operators';

import { selectAllLances } from '../../store';
import { Mechwarrior } from '../../../mechwarriors/models/mechwarriors';
import { MechwarriorsService } from '../../../mechwarriors/services/mechwarriors.service';

@Component({
  selector: 'tm-lance-manger-container',
  styleUrls: ['lance-manager.component.scss'],
  template: `
  <div class="row">
    <div class="col">
      <tm-lance-manager-header (newLance)="onNewLance($event)" (updateControls)="onUpdateControls($event)"></tm-lance-manager-header>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let lance of lances; let i = index">
            <tm-lance-list-item [lance]="lance" (deleteLance)="onDeleteLance($event)"
              (updateLance)="onUpdateLance($event)" [mechwarriors]="mechwarriors"></tm-lance-list-item>
        </ul>
      </div>
    </div>
  </div>
  `
})
export class TMLanceManagerComponent implements OnInit, OnDestroy {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  lances: Lance[];
  mechwarriors: Mechwarrior[];

  lanceForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private lanceService: LanceManagerService,
    private mwService: MechwarriorsService,
    private fb: FormBuilder
  ) {
    this.lances = [];
    this.mechwarriors = [];
  }

  ngOnInit() {
    this.lanceService
      .getAllLances()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        this.lances = Object.keys(data.lances.entities).map(i => data.lances.entities[i]);
      });
    this.mwService
      .getAllMechwarriors()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        this.mechwarriors = Object.keys(data.mechwarriors.entities).map(i => data.mechwarriors.entities[i]);
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  onSubmit() {
    this.lanceService.updateLance(this.lanceForm.value);
  }

  onUpdateControls({ searchQuery }) {
    this.lanceService
      .getAllLances()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((data: any) => {
        this.lances = Object.keys(data.lances.entities)
          .map(i => data.lances.entities[i])
          .filter(lance => lance.name.toLowerCase().includes(searchQuery.toLowerCase()));
      });
  }

  onNewLance(event) {
    event.preventDefault();
    this.lanceService.addLance({
      /** TODO: Turn this into flavour text via a data service */
      name: 'Techmech Raptors',
      description: 'A battle hardend lance that dishes out gunishment',
      mechs: [],
      mechwarriors: [
        {
          name: 'Titus',
          stats: {}
        }
      ]
    });
  }

  onUpdateLance(lance) {
    this.lanceService.updateLance(lance);
  }

  onDeleteLance(lance) {
    this.lanceService.deleteLance(lance);
  }
}
