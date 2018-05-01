import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { MechData, MechsState } from '../../models';
import * as mechModels from '../../store';



@Component({
  selector: 'tm-mech-builder',
  templateUrl: './mech-builder.component.html',
  styleUrls: ['mech-builder.component.scss']
})
export class MechBuilderComponent implements OnInit, OnDestroy {
  componentDestroyed$: Subject<boolean> = new Subject<boolean>();

  mechList$: Observable<MechsState>;

  selectedMech: any;

  constructor(private store: Store<MechsState>) {
    console.log('container');
  }

  ngOnInit() {
    this.mechList$ = this.store.pipe(
      select(mechModels.getMechs),
      map(data => {
        return data.reduce(
          (mechGroups: any, mech: MechData) => {
            if (mechGroups[mech.class]) {
              const menuItem = {
                id: `${mech.class}::${mech.name}`,
                name: mech.name,
                mech: mech,
                children: mech.models.map((model: any) => ({
                  id: `${mech.class}::${mech.name}::${model.name}`,
                  name: model.name,
                  mech: mech,
                  model: model
                }))
              };

              mechGroups[mech.class].push(menuItem);
            }
            return mechGroups;
          },
          { Light: [], Medium: [], Heavy: [], Assault: [] }
        );
      }),
      tap(data => console.log(data)),
      takeUntil(this.componentDestroyed$)
    );
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

  setSelectedMech(mechId) {
    this.selectedMech = mechId;
  }

  onClick(node) {
    console.log('OnClick', node.data);
  }

  onDblClick(node) {
    console.log('OnDblClick', node.data);
    this.selectedMech = node.data;
  }
}
