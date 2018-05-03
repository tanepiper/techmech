import { Action } from '@ngrx/store';
import { Mechwarrior } from '../models/mechwarriors';

export const ADD_MECHWARRIOR = 'ADD_MECHWARRIOR';
export const DELETE_MECHWARRIOR = 'DELETE_MECHWARRIOR';
export const UPDATE_MECHWARRIOR = 'UPDATE_MECHWARRIOR';
export const TOGGLE_DONE = 'TOGGLE_DONE';
export const ADD_ALL_MECHWARRIORS = 'ADD_ALL_MECHWARRIORS';
export const LOAD_MECHWARRIORS = 'LOAD_MECHWARRIORS';

export class LoadMechwarriors implements Action {
  readonly type = LOAD_MECHWARRIORS;
}

export class AddMechwarrior implements Action {
  readonly type = ADD_MECHWARRIOR;
  constructor(public payload: Mechwarrior) {}
}

export class AddAllMechwarriors implements Action {
  readonly type = ADD_ALL_MECHWARRIORS;
  constructor(public payload: Mechwarrior[]) {}
}

export class DeleteMechwarrior implements Action {
  readonly type = DELETE_MECHWARRIOR;

  constructor(public payload: Mechwarrior) {}
}

export class UpdateMechwarrior implements Action {
  readonly type = UPDATE_MECHWARRIOR;

  constructor(public payload: Mechwarrior) {}
}

export type MechwarriorActions = AddMechwarrior | DeleteMechwarrior | UpdateMechwarrior | AddAllMechwarriors | LoadMechwarriors;
