import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';

import { FormBuilder, FormGroup } from '@angular/forms';

import { SettingsService } from '../../../settings/services/settings.service';
import { SettingsGroup } from '../../../settings/models/setting';
import { MechwarriorsService } from '../../services/mechwarriors.service';
import { Mechwarrior } from '../../models/mechwarriors';

import * as MechwarriorsStore from '../../store';
import { take } from 'rxjs/operator/take';
import { tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { selectAllMechwarriors } from '../../store';

@Component({
  selector: 'tm-mechwarrior-manger-container',
  styleUrls: ['mechwarriors.component.scss'],
  template: `
  <div class="row">
    <div class="col">
      <tm-mechwarriors-header (newMechWarrior)="onNewMechwarrior($event)" 
        (updateControls)="onUpdateControls($event)"></tm-mechwarriors-header>
      <div class="card-body">
        <ul class="list-group">
          <li class="list-group-item" *ngFor="let mechwarrior of displayMechwarriors; let i = index">
            <tm-mechwarrior-list-item [mechwarrior]="mechwarrior" (deleteMechwarrior)="onDeleteMechwarrior($event)"
              (updateMechwarrior)="onUpdateMechwarrior($event)"></tm-mechwarrior-list-item>
        </ul>
      </div>
    </div>
  </div>
  `
})
export class TMMechwarriorsComponent implements OnInit {
  settings$: Observable<SettingsGroup>;

  mechwarriors$: Observable<Mechwarrior[]>;

  displayMechwarriors: Mechwarrior[];

  mechwarriorForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private mechwarriorService: MechwarriorsService,
    private store: Store<Mechwarrior[]>,
    private fb: FormBuilder
  ) {
    this.settings$ = this.settingsService.getSettings();
    this.displayMechwarriors = [];
  }

  ngOnInit() {
    this.mechwarriors$ = this.mechwarriorService.getAllMechwarriors();
    const getData = this.mechwarriors$.subscribe(
      (data: any) => (this.displayMechwarriors = Object.keys(data.mechwarriors.entities).map(i => data.mechwarriors.entities[i])),
      error => {
        console.log(error);
      },
      () => getData.unsubsribe()
    );
  }

  onSubmit() {
    this.mechwarriorService.updateMechwarrior(this.mechwarriorForm.value);
  }

  onUpdateControls({ searchQuery }) {
    let thisIsBad;
    console.log(searchQuery);
    if (searchQuery === '') {
      thisIsBad = this.mechwarriors$.subscribe(
        (data: any) => (this.displayMechwarriors = Object.keys(data.mechwarriors.entities).map(i => data.mechwarriors.entities[i])),
        error => {
          console.log(error);
        },
        () => thisIsBad.unsubsribe()
      );
    } else {
      thisIsBad = this.mechwarriors$.subscribe(
        (data: any) =>
          (this.displayMechwarriors = Object.keys(data.mechwarriors.entities)
            .map(i => data.mechwarriors.entities[i])
            .filter(mechwarrior => mechwarrior.name.toLowerCase().includes(searchQuery.toLowerCase()))),
        error => {
          console.log(error);
        },
        () => thisIsBad.unsubsribe()
      );
    }
  }

  onNewMechwarrior(event) {
    event.preventDefault();
    this.mechwarriorService.addMechwarrior({
      /** TODO: Turn this into flavour text via a data service */
      name: 'Techmech Raptors',
      description: 'A battle hardend mechwarrior that dishes out gunishment',
      stats: {
        gunnery: 4,
        pilot: 4,
        guts: 4,
        tactics: 4
      }
    });
  }

  onUpdateMechwarrior(mechwarrior) {
    this.mechwarriorService.updateMechwarrior(mechwarrior);
  }

  onDeleteMechwarrior(mechwarrior) {
    this.mechwarriorService.deleteMechwarrior(mechwarrior);
  }
}
