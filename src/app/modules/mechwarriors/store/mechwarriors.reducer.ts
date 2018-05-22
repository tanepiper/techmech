import { createEntityAdapter, EntityState, EntityAdapter, Update } from '@ngrx/entity';

import { Mechwarrior } from '../models/mechwarriors';

import * as MechwarriorsActions from './mechwarriors.actions';

export interface State extends EntityState<Mechwarrior> {
  selectedMechwarrior: number | null;
}

export const entityAdapter: EntityAdapter<Mechwarrior> = createEntityAdapter<Mechwarrior>();

export const initialState: State = entityAdapter.getInitialState({
  selectedMechwarrior: null
});

export function reducer(state: State = initialState, action: MechwarriorsActions.MechwarriorActions): State {
  switch (action.type) {
    case MechwarriorsActions.ADD_ALL_MECHWARRIORS:
      return entityAdapter.addAll(action.payload.mechwarriors, state);
    case MechwarriorsActions.ADD_MECHWARRIOR:
      return entityAdapter.addOne(action.payload.mechwarrior, state);
    case MechwarriorsActions.UPDATE_MECHWARRIOR:
      return entityAdapter.updateOne(action.payload.mechwarrior, state);
    case MechwarriorsActions.DELETE_MECHWARRIOR:
      return entityAdapter.removeOne(action.payload.mechwarrior.id, state);
    default:
      return state;
  }
}

export const {
  // select the array of user ids
  selectIds: selectMechwarriorIds,

  // select the dictionary of Mechwarrior entities
  selectEntities: selectMechwarriorEntities,

  // select the array of Mechwarriors
  selectAll: selectAllMechwarriors,

  // select the total Mechwarrior count
  selectTotal: selectMechwarriorTotal,
} = entityAdapter.getSelectors();
