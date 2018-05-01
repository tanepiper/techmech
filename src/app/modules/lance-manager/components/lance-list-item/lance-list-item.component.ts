import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Lance } from '../../models/lance-manager';

@Component({
  selector: 'tm-lance-list-item',
  styleUrls: ['lance-list-item.component.scss'],
  template: `
  <div class="card">
    <div class="card-header">
      <h3 class="card-title">{{lance.name}}</h3>
      <h4 class="card-subtitle">{{lance.description}}</h4>
      <div class="card-options">
        <a href="#" class="card-options-collapse" data-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a>
        <a href="#" class="card-options-remove" data-toggle="card-remove"><i class="fe fe-x"></i></a>
      </div>
    </div>

    <div class="card-alert alert alert-success mb-0">Lance Composition Correct</div>

    <div class="card-body">
      <div class="container">
        <h5>Mechwarriors</h5>
          <div class="row">
          <div class="col">1</div>
          <div class="col">2</div>
          <div class="col">3</div>
          <div class="col">4</div>
        </div>
        <h5>Mechs</h5>
          <div class="row">
          <div class="col">1</div>
          <div class="col">2</div>
          <div class="col">3</div>
          <div class="col">4</div>
        </div>
      </div>
      <button (click)="onDeleteLance($event)">Delete Lance</button>
    </div>
  </div>
  `
})
export class TMLanceListItemComponent {
  @Input() lance: Lance;

  @Output() deleteLance: EventEmitter<Lance> = new EventEmitter<Lance>();

  constructor() {}

  onDeleteLance(event) {
    event.preventDefault();
    this.deleteLance.emit(this.lance);
  }
}
