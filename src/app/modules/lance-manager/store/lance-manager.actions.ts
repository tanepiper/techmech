import { Action } from '@ngrx/store';
import { Lance } from '../models/lance-manager';

export const ADD_LANCE = 'ADD_LANCE';
export const DELETE_LANCE = 'DELETE_LANCE';
export const UPDATE_LANCE = 'UPDATE_LANCE';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const ADD_ALL_LANCES = 'ADD_ALL_LANCES';

export class AddLance implements Action {
  readonly type = ADD_LANCE;
  constructor(public payload: Lance) {}
}

export class AddAllLances implements Action {
  readonly type = ADD_ALL_LANCES;
  constructor(public payload: Lance[]) {}
}

export class DeleteLance implements Action {
  readonly type = DELETE_LANCE;

  constructor(public payload: Lance) {}
}

export class UpdateLance implements Action {
  readonly type = UPDATE_LANCE;

  constructor(public payload: Lance) {}
}

export type LanceActions = AddLance | DeleteLance | UpdateLance | AddAllLances;
