import * as equipmentActions from '../actions/equipment.actions';
import { EquipmentData } from '../../models/equipment-data-item';

export interface EquipmentState {
  loading: boolean;
  loaded: boolean;
  data: EquipmentData[];
  error: Error | null;
}

const initialState: EquipmentState = {
  loading: false,
  loaded: false,
  data: [],
  error: null
};

export function reducer(state: EquipmentState = initialState, action: equipmentActions.EquipmentAction) {
  switch (action.type) {
    case equipmentActions.LOAD_EQUIPMENT: {
      return { ...state, loading: true, loaded: false, data: [], error: null };
    }

    case equipmentActions.LOAD_EQUIPMENT_SUCCESS: {
      return { ...state, loading: false, loaded: true, data: action.payload, error: null };
    }

    case equipmentActions.LOAD_EQUIPMENT_FAIL: {
      return { ...state, loading: false, loaded: false, error: action.payload };
    }

    default: {
      return state;
    }
  }
}

export const getEquipment = (state: EquipmentState) => state;
