import { createEntityAdapter, EntityState, EntityAdapter, Update } from '@ngrx/entity';

import { Mechwarrior } from '../models/mechwarriors';

import * as MechwarriorsActions from './mechwarriors.actions';

export interface State extends EntityState<Mechwarrior> {
  selectedMechwarrior: number | null;
}

export const MechwarriorsAdapter: EntityAdapter<Mechwarrior> = createEntityAdapter<Mechwarrior>();

export const initialState: State = MechwarriorsAdapter.getInitialState({
  selectedMechwarrior: null
});
console.log(initialState);

export function MechwarriorsReducer(state: State = initialState, action: MechwarriorsActions.MechwarriorActions): State {
  switch (action.type) {
    case MechwarriorsActions.ADD_ALL_LANCES:
      console.log('addAll', action);
      return MechwarriorsAdapter.addAll(action.payload, state);
    case MechwarriorsActions.ADD_LANCE:
      console.log('add', action);
      return MechwarriorsAdapter.addOne(action.payload, state);
    case MechwarriorsActions.UPDATE_LANCE:
      console.log('update', action);
      return MechwarriorsAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    case MechwarriorsActions.DELETE_LANCE:
      console.log('delete', action);
      return MechwarriorsAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
