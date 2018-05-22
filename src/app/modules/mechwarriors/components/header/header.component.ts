import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil, skipWhile } from 'rxjs/operators';

@Component({
  selector: 'tm-mechwarriors-header',
  styleUrls: ['header.component.scss'],
  template: `
  <div class="card-header">
  <h2 class="card-title">Mechwarriors Manager</h2>
  <div class="card-options">
    <button class="btn btn-primary btn-sm" (click)="onNewMechwarrior($event)">Add New Mechwarrior</button>

    <form novalidate [formGroup]="headerFormGroup">
      <div class="input-group">
        <input type="text" class="form-control form-control-sm" placeholder="Search Mechwarriors" formControlName="searchQuery">
        <span class="input-group-append">
          <span class="input-group-text"><span class="fe fe-search"></span></span>
        </span>
      </div>
    </form>
  </div>
</div>
  `
})
export class TmMechwarriorsHeaderComponent implements OnInit, OnDestroy {
  @Output() newMechWarrior: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @Output() updateControls: EventEmitter<object> = new EventEmitter<object>();

  headerFormGroup: FormGroup;

  protected cleanup$: Subject<boolean> = new Subject<boolean>();
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.headerFormGroup = this.fb.group({
      searchQuery: ''
    });

    this.headerFormGroup.valueChanges
      .pipe(
        debounceTime(200),
        startWith({ searchQuery: ''}),
        skipWhile(value => value.searchQuery.length < 3),
        takeUntil(this.cleanup$)
      ).subscribe(formState => this.updateControls.emit(formState));
  }

  ngOnDestroy() {
    this.cleanup$.next(true);
    this.cleanup$.complete();
  }

  onNewMechwarrior(event) {
    this.newMechWarrior.emit(event);
  }
}
