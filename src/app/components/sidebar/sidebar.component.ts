import { Component, OnInit } from '@angular/core';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MechData, MechsState } from '../../models';
import * as mechModels from '../../store';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  mechList$: Observable<MechsState>;

  constructor(private store: Store<MechsState>) {}

  ngOnInit() {
    this.mechList$ = this.store.pipe(select(mechModels.getMechs));
  }
}
