import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { FormBuilder, FormGroup } from '@angular/forms';

import { SettingsService } from '../../../settings/services/settings.service';
import { SettingsGroup } from '../../../settings/models/setting';
import { MechwarriorsService } from '../../services/mechwarriors.service';
import { Mechwarrior, SkillLevels } from '../../models/mechwarriors';
import { TMSkillsService } from '../../services/skills.service';

import * as MechwarriorsStore from '../../store';

import { tap, takeUntil } from 'rxjs/operators';

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
          <li class="list-group-item" *ngFor="let mechwarrior of mechwarriors; let i = index">
            <tm-mechwarrior-list-item [mechwarrior]="mechwarrior" (deleteMechwarrior)="onDeleteMechwarrior($event)"
              (updateMechwarrior)="onUpdateMechwarrior($event)" [skills]="skills"></tm-mechwarrior-list-item>
        </ul>
      </div>
    </div>
  </div>
  `
})
export class TMMechwarriorsComponent implements OnInit {
  destroyed$: Subject<boolean> = new Subject<boolean>();

  mechwarriors: Mechwarrior[];
  skills: SkillLevels;

  mechwarriorForm: FormGroup;

  constructor(
    private settingsService: SettingsService,
    private mechwarriorService: MechwarriorsService,
    private fb: FormBuilder,
    private skillsService: TMSkillsService
  ) {
    this.mechwarriors = [];
    this.skills = {
      gunnery: {},
      piloting: {},
      guts: {},
      tactics: {}
    };
  }

  ngOnInit() {
    this.mechwarriorService
      .getAllMechwarriors()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data: any) => {
          console.log(data);
          (this.mechwarriors = (data && Object.keys(data.mechwarriors.entities) || []).map(k => data.mechwarriors.entities[k]));
        }
      );

    this.skillsService
      .getSkills()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(data => (this.skills = data));
  }

  onSubmit() {
    this.mechwarriorService.updateMechwarrior(this.mechwarriorForm.value);
  }

  onUpdateControls({ searchQuery }) {
    this.mechwarriorService
      .getAllMechwarriors()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(
        (data: any) =>
          (this.mechwarriors = (data && Object.keys(data.mechwarriors.entities) || []).map(k => data.mechwarriors.entities[k])
            .filter(mechwarrior => mechwarrior.name.toLowerCase().includes(searchQuery.toLowerCase())))
      );
  }

  onNewMechwarrior(event) {
    event.preventDefault();
    this.mechwarriorService.addMechwarrior({
      /** TODO: Turn this into flavour text via a data service */
      name: '',
      description: '',
      type: '',
      stats: {
        gunnery: 4,
        piloting: 4,
        guts: 4,
        tactics: 4
      },
      skills: {
        first: '',
        second: '',
        third: ''
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
