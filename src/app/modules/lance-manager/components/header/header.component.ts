import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'tm-lance-manager-header',
  styleUrls: ['header.component.scss'],
  template: `
  <div class="card-header">
  <h2 class="card-title">Lance Manager</h2>
  <div class="card-options">
    <button class="btn btn-primary btn-sm" (click)="onNewLance($event)">Add New Lance</button>

    <form novalidate [formGroup]="headerFormGroup" (ngSubmit)="onChange($event)">
      <div class="input-group">
        <input type="text" class="form-control form-control-sm" placeholder="Search Lances" formControlName="searchQuery">
        <span class="input-group-btn ml-2">
          <button class="btn btn-sm btn-default" type="submit">
            <span class="fe fe-search"></span>
          </button>
        </span>
      </div>
    </form>
  </div>
</div>
  `
})
export class TmLanceManagerHeaderComponent implements OnInit {
  @Output() newLance: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() updateControls: EventEmitter<object> = new EventEmitter<object>();

  headerFormGroup: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.headerFormGroup = this.fb.group({
      searchQuery: ''
    });
  }

  onNewLance(event) {
    this.newLance.emit(event);
  }

  onChange(event) {
    console.log(this.headerFormGroup.value);
    this.updateControls.emit(this.headerFormGroup.value);
  }
}
