import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as mechsModels from '../../models';

import * as equipmentReducer from './equipment.reducer';
import * as mechsReducer from './mechs.reducer';
import * as weaponsReducer from './weapons.reducer';

interface AppReducers {
  [key: string]: any;
}

export const reducers: ActionReducerMap<AppReducers> = {
  mechBuilder: mechsReducer.reducer,
  equipment: equipmentReducer.reducer,
  mechs: mechsReducer.reducer,
  weapons: weaponsReducer.reducer
};

export const getEquipmentState = createFeatureSelector<equipmentReducer.EquipmentState>('equipment');
export const getMechsState = createFeatureSelector<mechsModels.MechsState>('mechs');
export const getWeaponsState = createFeatureSelector<weaponsReducer.WeaponsState>('weapons');

export const getEquipment = createSelector(getEquipmentState, equipmentReducer.getEquipment);
export const getMechs = createSelector(getMechsState, mechsReducer.getMechs);
export const getWeapons = createSelector(getWeaponsState, weaponsReducer.getWeapons);
