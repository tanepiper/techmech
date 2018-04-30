import * as weaponActions from '../actions/weapons.actions';
import { WeaponData } from '../../models/weapon-data-item';

export interface WeaponsState {
  loading: boolean;
  loaded: boolean;
  data: WeaponData[];
  error: Error | null;
}

const initialState: WeaponsState = {
  loading: false,
  loaded: false,
  data: [],
  error: null
};

export function reducer(state: WeaponsState = initialState, action: weaponActions.WeaponAction) {
  switch (action.type) {
    case weaponActions.LOAD_WEAPONS: {
      return { ...state, loading: true };
    }

    case weaponActions.LOAD_WEAPONS_SUCCESS: {
      return { ...state, data: action.payload, loading: false, loaded: true };
    }

    case weaponActions.LOAD_WEAPONS_FAIL: {
      return { ...state, error: action.payload, loading: false, loaded: false };
    }

    default: {
      return state;
    }
  }
}

export const getWeapons = (state: WeaponsState) => state;
