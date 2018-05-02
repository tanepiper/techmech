import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Mechwarrior, SkillLevels } from '../../models/mechwarriors';

@Component({
  selector: 'tm-mechwarrior-list-item',
  styleUrls: ['mechwarrior-list-item.component.scss'],
  template: `
  <div class="card">

    <div *ngIf="editing">
      <div class="card-header">
        <h3 class="card-title">{{mechwarrior.name}}</h3>
        <div class="card-options">
          <a (click)="onEdit()" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-corner-up-left"></i></a>
          <a (click)="onDeleteMechwarrior($event)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>
      <div class="card-body">
        <tm-mechwarrior-form (save)="onSave($event)" [mechwarrior]="mechwarrior" [skills]="skills"></tm-mechwarrior-form>
      </div>
    </div>

    <div *ngIf="!editing">
      <div class="card-header">
        <h3 class="card-title">{{mechwarrior.name}} ({{mechwarrior.type}})</h3>
        <div class="card-options">
          <a (click)="onEdit()" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-edit"></i></a>
          <a (click)="onDeleteMechwarrior($event)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>

      <div class="card-body">
        <p>{{mechwarrior.description}}</p>
      </div>

      <div class="card-body">
        <div class="row">
          <div class="col"><strong>First Skill:</strong> {{mechwarrior?.skills?.first}}</div>
          <div class="col"><strong>Second Skill:</strong> {{mechwarrior?.skills?.second}}</div>
          <div class="col"><strong>Third Skill:</strong> {{mechwarrior?.skills?.third}}</div>
        </div>
      </div>

      <div class="card-body">
        <div class="container">
          <div class="row">
            <h3>Skills</h3>
          </div>
          <tm-skill-tree [editMode]="false" [skill]="skills.gunnery"
            [value]="mechwarrior?.stats?.gunnery"></tm-skill-tree>
          <tm-skill-tree [editMode]="false" [skill]="skills.piloting"
            [value]="mechwarrior?.stats?.piloting"></tm-skill-tree>
          <tm-skill-tree [editMode]="false" [skill]="skills.guts"
            [value]="mechwarrior?.stats?.guts"></tm-skill-tree>
          <tm-skill-tree [editMode]="false" [skill]="skills.tactics"
            [value]="mechwarrior?.stats?.tactics"></tm-skill-tree>
        </div>
      </div>
    </div>
  </div>
  `
})
export class TMMechwarriorListItemComponent implements OnInit {
  @Input() mechwarrior: Mechwarrior;

  @Input() skills: any;

  @Output()
  updateMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<
    Mechwarrior
  >();

  @Output()
  deleteMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<
    Mechwarrior
  >();

  editing = false;

  constructor() {}

  ngOnInit() {
    if (!this.mechwarrior.name) {
      this.editing = true;
    }
  }

  onUpdateSkill({ skill, value }) {
    const mechwarrior = Object.assign({}, this.mechwarrior);
    if (mechwarrior.stats[skill]) {
      mechwarrior.stats[skill] = value;
    }
    this.updateMechwarrior.emit(this.mechwarrior);
  }

  onEdit() {
    this.editing = !this.editing;
  }

  onSave(mechwarrior) {
    this.updateMechwarrior.emit(mechwarrior);
  }

  onDeleteMechwarrior(event) {
    event.preventDefault();
    // const confirm = window.confirm(`Are you sure you want to delete ${this.mechwarrior.name}?`);
    const confirm = true;
    if (confirm) {
      this.deleteMechwarrior.emit(this.mechwarrior);
    }
  }
}
