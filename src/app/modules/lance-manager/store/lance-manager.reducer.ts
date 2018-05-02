import { createEntityAdapter, EntityState, EntityAdapter, Update } from '@ngrx/entity';

import { Lance } from '../models/lance-manager';

import * as lanceManagerActions from './lance-manager.actions';

export interface State extends EntityState<Lance> {
  selectedLance: number | null;
}

export const lanceManagerAdapter: EntityAdapter<Lance> = createEntityAdapter<Lance>();

export const initialState: State = lanceManagerAdapter.getInitialState({
  selectedLance: null
});

export function lanceManagerReducer(state: State = initialState, action: lanceManagerActions.LanceActions): State {
  switch (action.type) {
    case lanceManagerActions.ADD_ALL_LANCES:
      return lanceManagerAdapter.addAll(action.payload, state);
    case lanceManagerActions.ADD_LANCE:
      return lanceManagerAdapter.addOne(action.payload, state);
    case lanceManagerActions.UPDATE_LANCE:
      return lanceManagerAdapter.updateOne({ id: action.payload.id, changes: action.payload }, state);
    case lanceManagerActions.DELETE_LANCE:
      return lanceManagerAdapter.removeOne(action.payload.id, state);
    default:
      return state;
  }
}
