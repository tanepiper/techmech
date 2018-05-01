import { Action } from '@ngrx/store';
import { MechData } from '../../models';

export const LOAD_EQUIPMENT = '[Mech Builder] Load EQUIPTMENT';
export const LOAD_EQUIPMENT_SUCCESS = '[Mech Builder] Load EQUIPTMENT Success';
export const LOAD_EQUIPMENT_FAIL = '[Mech Builder] Load EQUIPTMENT Failed';

export class LoadEquipment implements Action {
  readonly type = LOAD_EQUIPMENT;
}

export class LoadEquipmentSuccess implements Action {
  readonly type = LOAD_EQUIPMENT_SUCCESS;
  constructor(public payload: MechData[]) {}
}

export class LoadEquipmentFail implements Action {
  readonly type = LOAD_EQUIPMENT_FAIL;
  constructor(public payload: Error) {}
}

export type EquipmentAction = LoadEquipment | LoadEquipmentFail | LoadEquipmentSuccess;
