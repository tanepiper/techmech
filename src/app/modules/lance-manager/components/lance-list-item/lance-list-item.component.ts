import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Lance } from '../../models/lance-manager';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Mechwarrior } from '../../../mechwarriors/models/mechwarriors';

@Component({
  selector: 'tm-lance-list-item',
  styleUrls: ['lance-list-item.component.scss'],
  template: `
  <div class="card">

    <div *ngIf="editing">
      <div class="card-header">
        <h3 class="card-title">{{lance.name}}</h3>
        <div class="card-options">
          <a (click)="onEdit()" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-corner-up-left"></i></a>
          <a (click)="onDeleteLance($event)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>
      <div class="card-body">
        <tm-lance-form (save)="onSave($event)" [lance]="lance"></tm-lance-form>
      </div>
    </div>

    <div *ngIf="!editing">
      <div class="card-header">
        <h3 class="card-title">{{lance.name}}</h3>
        <div class="card-options">
          <a (click)="onEdit()" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-edit"></i></a>
          <a (click)="onDeleteLance($event)" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
        </div>
      </div>

      <div class="card-alert alert alert-danger mb-0">Lance Composition Incorrect</div>
      <div class="card-body">
        <p>{{lance.description}}</p>
      </div>

      <div class="card-body">
        <div class="container">

          <div class="row">
            <h3>Mechwarriors</h3>
          </div>

          <div class="row">
            <div class="col">
              <select>
                <option *ngFor="let mechwarrior of mechwarriors">{{mechwarrior.name}}</option>
              </select>
              <div *ngIf="lance?.mechwarriors[0]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechwarriors[0].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechwarriors[0]">
                <div class="card">
                  <div class="card-body"><strong>No Mechwarrior Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechwarriors[1]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechwarriors[1].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechwarriors[1]">
                <div class="card">
                  <div class="card-body"><strong>No Mechwarrior Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechwarriors[2]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechwarriors[2].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechwarriors[2]">
                <div class="card">
                  <div class="card-body"><strong>No Mechwarrior Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechwarriors[3]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechwarriors[3].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechwarriors[3]">
                <div class="card">
                  <div class="card-body"><strong>No Mechwarrior Selected</strong></div>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
            <h3>Mechs</h3>
          </div>

          <div class="row">
            <div class="col">
              <div *ngIf="lance?.mechs[0]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechs[0].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechs[0]">
                <div class="card">
                  <div class="card-body"><strong>No Mech Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechs[1]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechs[1].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechs[1]">
                <div class="card">
                  <div class="card-body"><strong>No Mech Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechs[2]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechs[2].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechs[2]">
                <div class="card">
                  <div class="card-body"><strong>No Mech Selected</strong></div>
                </div>
              </div>
            </div>
            <div class="col">
              <div *ngIf="lance?.mechs[3]">
                <div class="card">
                  <h3 class="card-header">{{lance.mechs[3].name}}</h3>
                </div>
              </div>
              <div *ngIf="!lance?.mechs[3]">
                <div class="card">
                  <div class="card-body"><strong>No Mech Selected</strong></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
})
export class TMLanceListItemComponent {
  @Input() lance: Lance;

  @Input() mechwarriors: Mechwarrior[];

  @Output() updateLance: EventEmitter<Lance> = new EventEmitter<Lance>();

  @Output() deleteLance: EventEmitter<Lance> = new EventEmitter<Lance>();

  editing = false;

  constructor() {
    console.log(this.mechwarriors);
  }

  onEdit() {
    this.editing = !this.editing;
  }

  onSave(lance) {
    this.updateLance.emit(lance);
  }

  onDeleteLance(event) {
    event.preventDefault();
    // const confirm = window.confirm(`Are you sure you want to delete ${this.lance.name}?`);
    const confirm = true;
    if (confirm) {
      this.deleteLance.emit(this.lance);
    }
  }
}
