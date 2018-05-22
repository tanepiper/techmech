import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as mechwarriorsReducer from './mechwarriors.reducer';

export interface State {
  mechwarriors: mechwarriorsReducer.State;
}

export const reducers: ActionReducerMap<State> = {
  mechwarriors: mechwarriorsReducer.reducer
};

export const selectMechwarriorsState = createFeatureSelector<mechwarriorsReducer.State>('mechwarriors');

export const selectAllMechwarriors = createSelector(
  selectMechwarriorsState,
  mechwarriorsReducer.selectAllMechwarriors
);
