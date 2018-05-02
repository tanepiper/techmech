import { createSelector, createFeatureSelector, ActionReducerMap } from '@ngrx/store';

import * as lanceManagerReducer from './lance-manager.reducer';

export const reducers: ActionReducerMap<any> = {
  lances: lanceManagerReducer.lanceManagerReducer
};

export const selectLanceManagerState = createFeatureSelector<lanceManagerReducer.State>('lances');

export const { selectAll: selectAllLances } = lanceManagerReducer.lanceManagerAdapter.getSelectors(
  selectLanceManagerState
);

export * from './lance-manager.actions';
export * from './lance-manager.reducer';
