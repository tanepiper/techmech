import { Action } from '@ngrx/store';
import { WeaponData } from '../../models/weapon-data-item';

export const LOAD_WEAPONS = '[Mech Builder] Load WEAPONS';
export const LOAD_WEAPONS_SUCCESS = '[Mech Builder] Load WEAPONS Success';
export const LOAD_WEAPONS_FAIL = '[Mech Builder] Load WEAPONS Failed';

export class LoadWeapons implements Action {
  readonly type = LOAD_WEAPONS;
}

export class LoadWeaponsSuccess implements Action {
  readonly type = LOAD_WEAPONS_SUCCESS;
  constructor(public payload: WeaponData[]) {}
}

export class LoadWeaponsFail implements Action {
  readonly type = LOAD_WEAPONS_FAIL;
  constructor(public payload: Error) {}
}

export type WeaponAction = LoadWeapons | LoadWeaponsFail | LoadWeaponsSuccess;
