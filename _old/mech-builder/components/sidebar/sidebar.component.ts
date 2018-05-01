// import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

// import { Store, select } from '@ngrx/store';

// import { MechData, MechsState } from '../../models';
// import * as mechModels from '../../store';
// import { Subject, Observable } from 'rxjs';
// import { map, reduce, tap, switchMap, takeUntil } from 'rxjs/operators';

// import { TreeNode, TreeModel, TREE_ACTIONS, KEYS, ITreeOptions } from 'angular-tree-component';

// import { createActionMapping } from './tree-actions';

// @Component({
//   selector: 'tm-sidebar',
//   templateUrl: './sidebar.component.html',
//   styleUrls: ['./sidebar.component.scss']
// })
// export class SidebarComponent implements OnInit, OnDestroy {
//   componentDestroyed$: Subject<boolean> = new Subject<boolean>();

//   mechList$: Observable<MechsState>;

//   options: ITreeOptions;

//   @Output('mechClick') mechClick: EventEmitter<any> = new EventEmitter<any>();

//   @Output('mechDblClick') mechDblClick: EventEmitter<any> = new EventEmitter<any>();

//   constructor(private store: Store<MechsState>) {
//     this.options = {
//       actionMapping: createActionMapping(this)
//     };
//   }

//   ngOnInit() {
//     this.mechList$ = this.store.pipe(
//       select(mechModels.getMechs),
//       map(data => {
//         return data.reduce(
//           (mechGroups: any, mech: MechData) => {
//             if (mechGroups[mech.class]) {
//               const menuItem = {
//                 id: `${mech.class}::${mech.name}`,
//                 name: mech.name,
//                 mech: mech,
//                 children: mech.models.map((model: any) => ({
//                   id: `${mech.class}::${mech.name}::${model.name}`,
//                   name: model.name,
//                   mech: mech,
//                   model: model
//                 }))
//               };

//               mechGroups[mech.class].push(menuItem);
//             }
//             return mechGroups;
//           },
//           { Light: [], Medium: [], Heavy: [], Assault: [] }
//         );
//       }),
//       tap(data => console.log(data)),
//       takeUntil(this.componentDestroyed$)
//     );
//   }

//   ngOnDestroy() {
//     this.componentDestroyed$.next(true);
//     this.componentDestroyed$.complete();
//   }
// }
