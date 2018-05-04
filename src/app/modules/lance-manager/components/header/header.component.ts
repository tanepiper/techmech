import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, startWith, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'tm-lance-manager-header',
  styleUrls: ['header.component.scss'],
  template: `
  <div class="card-header">
  <h2 class="card-title">Lance Manager</h2>
  <div class="card-options">
    <button class="btn btn-primary btn-sm" (click)="onNewLance($event)">Add New Lance</button>

    <form novalidate [formGroup]="headerFormGroup">
      <div class="input-group">
        <input type="text" class="form-control form-control-sm" placeholder="Search Lances" formControlName="searchQuery">
        <span class="input-group-append">
          <span class="input-group-text"><span class="fe fe-search"></span></span>
        </span>
      </div>
    </form>
  </div>
</div>
  `
})
export class TmLanceManagerHeaderComponent implements OnInit, OnDestroy {
  @Output() newLance: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

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
        takeUntil(this.cleanup$)
      ).subscribe(formState => this.updateControls.emit(formState));
  }

  ngOnDestroy() {
    this.cleanup$.next(true);
    this.cleanup$.complete();
  }

  onNewLance(event) {
    this.newLance.emit(event);
  }
}
