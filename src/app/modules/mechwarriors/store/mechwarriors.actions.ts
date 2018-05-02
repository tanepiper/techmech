import { Action } from '@ngrx/store';
import { Mechwarrior } from '../models/mechwarriors';

export const ADD_LANCE = 'ADD_LANCE';
export const DELETE_LANCE = 'DELETE_LANCE';
export const UPDATE_LANCE = 'UPDATE_LANCE';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const ADD_ALL_LANCES = 'ADD_ALL_LANCES';

export class AddMechwarrior implements Action {
  readonly type = ADD_LANCE;
  constructor(public payload: Mechwarrior) {}
}

export class AddAllMechwarriors implements Action {
  readonly type = ADD_ALL_LANCES;
  constructor(public payload: Mechwarrior[]) {}
}

export class DeleteMechwarrior implements Action {
  readonly type = DELETE_LANCE;

  constructor(public payload: Mechwarrior) {}
}

export class UpdateMechwarrior implements Action {
  readonly type = UPDATE_LANCE;

  constructor(public payload: Mechwarrior) {}
}

export type MechwarriorActions = AddMechwarrior | DeleteMechwarrior | UpdateMechwarrior | AddAllMechwarriors;
