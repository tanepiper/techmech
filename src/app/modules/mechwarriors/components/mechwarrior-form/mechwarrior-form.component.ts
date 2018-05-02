import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mechwarrior } from '../../models/mechwarriors';

@Component({
  selector: 'tm-mechwarrior-form',
  styleUrls: ['mechwarrior-form.component.scss'],
  template: `
  <form novalidate class="form" [formGroup]="mechwarriorForm" (ngSubmit)="onSaveChanges($event)">
  <div class="form-group">
    <label class="form-label">Mechwarrior Name</label>
    <input type="text" class="form-control" placeholder="Mechwarrior Name" formControlName="name" />
  </div>
  <div class="form-group">
    <label class="form-label">Mechwarrior Description</label>
    <textarea class="form-control" placeholder="Mechwarrior Description" formControlName="description"></textarea>
  </div>

  <button type="submit" class="btn btn-default">Save Changes</button>
</form>
  `
})
export class TMMechwarriorFormComponent implements OnInit {
  @Input() mechwarrior: Mechwarrior;

  @Output() save: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  mechwarriorForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.mechwarriorForm = this.fb.group({
      id: this.mechwarrior.id,
      name: this.mechwarrior.name,
      description: this.mechwarrior.description,
      stats: this.fb.group({
        gunnery: this.mechwarrior.stats.gunnery,
        pilot: this.mechwarrior.stats.pilot,
        guts: this.mechwarrior.stats.guts,
        tactics: this.mechwarrior.stats.tactics,
      })
    });
  }

  onSaveChanges(event) {
    event.preventDefault();
    this.save.emit(this.mechwarriorForm.value);
  }
}
