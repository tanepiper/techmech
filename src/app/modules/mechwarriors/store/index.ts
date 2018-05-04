import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as MechwarriorsReducer from './mechwarriors.reducer';

export const reducers: ActionReducerMap<any> = {
  mechwarriors: MechwarriorsReducer.MechwarriorsReducer
};

export const selectMechwarriorsState = createFeatureSelector<MechwarriorsReducer.State>('mechwarriors');

export const { selectAll: selectAllMechwarriors } = MechwarriorsReducer.MechwarriorsAdapter.getSelectors(
  selectMechwarriorsState
);
