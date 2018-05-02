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

export function MechwarriorsReducer(state: State = initialState, action: MechwarriorsActions.MechwarriorActions): State {
  switch (action.type) {
    case MechwarriorsActions.ADD_ALL_LANCES:
      return MechwarriorsAdapter.addAll(action.payload, state);
    case MechwarriorsActions.ADD_LANCE:
      return MechwarriorsAdapter.addOne(action.payload, state);
    case MechwarriorsActions.UPDATE_LANCE:
      return MechwarriorsAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    case MechwarriorsActions.DELETE_LANCE:
      return MechwarriorsAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
