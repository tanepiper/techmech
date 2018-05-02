import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Lance } from '../../models/lance-manager';

@Component({
  selector: 'tm-lance-form',
  styleUrls: ['lance-form.component.scss'],
  template: `
  <form novalidate class="form" [formGroup]="lanceForm" (ngSubmit)="onSaveChanges($event)">
  <div class="form-group">
    <label class="form-label">Lance Name</label>
    <input type="text" class="form-control" placeholder="Lance Name" formControlName="name" />
  </div>
  <div class="form-group">
    <label class="form-label">Lance Description</label>
    <textarea class="form-control" placeholder="Lance Description" formControlName="description"></textarea>
  </div>

  <button type="submit" class="btn btn-default">Save Changes</button>
</form>
  `
})
export class TMLanceFormComponent implements OnInit {
  @Input() lance: Lance;

  @Output() save: EventEmitter<Lance> = new EventEmitter<Lance>();

  lanceForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.lanceForm = this.fb.group({
      id: this.lance.id,
      name: this.lance.name,
      description: this.lance.description,
      mechs: this.fb.array(this.lance.mechs || []),
      mechwarriors: this.fb.array(this.lance.mechwarriors || [])
    });
  }

  onSaveChanges(event) {
    event.preventDefault();
    this.save.emit(this.lanceForm.value);
  }
}
