import { Action } from '@ngrx/store';
import { MechData } from '../../models';

export const LOAD_MECHS = '[App] Load MECHS';
export const LOAD_MECHS_SUCCESS = '[App] Load MECHS Success';
export const LOAD_MECHS_FAIL = '[App] Load MECHS Failed';

export class LoadMechs implements Action {
  readonly type = LOAD_MECHS;
}

export class LoadMechsSuccess implements Action {
  readonly type = LOAD_MECHS_SUCCESS;
  constructor(public payload: MechData[]) {}
}

export class LoadMechsFail implements Action {
  readonly type = LOAD_MECHS_FAIL;
  constructor(public payload: Error) {}
}

export type MechAction = LoadMechs | LoadMechsFail | LoadMechsSuccess;
