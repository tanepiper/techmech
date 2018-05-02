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
        <tm-mechwarrior-form (save)="onSave($event)" [mechwarrior]="mechwarrior"></tm-mechwarrior-form>
      </div>
    </div>

    <div *ngIf="!editing">
      <div class="card-header">
        <h3 class="card-title">{{mechwarrior.name}}</h3>
        <div class="card-options">
          <a (click)="onEdit()" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-edit"></i></a>
          <a (click)="onDeleteMechwarrior($event)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>

      <div class="card-body">
        <p>{{mechwarrior.description}}</p>
      </div>

      <div class="card-body">
        <div class="container">

          <div class="row">
            <h3>Skills</h3>
          </div>
          <tm-skill-tree [skill]="skills.gunnery" [mechwarrior]="mechwarrior"></tm-skill-tree>
          <tm-skill-tree [skill]="skills.piloting" [mechwarrior]="mechwarrior"></tm-skill-tree>
          <tm-skill-tree [skill]="skills.guts" [mechwarrior]="mechwarrior"></tm-skill-tree>
          <tm-skill-tree [skill]="skills.tactics" [mechwarrior]="mechwarrior"></tm-skill-tree>
        </div>
      </div>
    </div>
  </div>
  `
})
export class TMMechwarriorListItemComponent implements OnInit {
  @Input() mechwarrior: Mechwarrior;

  @Input() skills: any;

  @Output() updateMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  @Output() deleteMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  editing = false;

  constructor() {}

  ngOnInit() {
    console.log(this.skills);
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