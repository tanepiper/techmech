import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tm-lance-manager-header',
  styleUrls: ['header.component.scss'],
  template: `
  <div class="card-header">
  <h2 class="card-title">Lance Manager</h2>
  <div class="card-options">
    <button class="btn btn-primary btn-sm" (click)="onNewLance($event)">Add New Lance</button>
  </div>
</div>
  `
})
export class TmLanceManagerHeaderComponent {
  @Output() newLance: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  constructor() {}

  onNewLance(event) {
    this.newLance.emit(event);
  }
}
