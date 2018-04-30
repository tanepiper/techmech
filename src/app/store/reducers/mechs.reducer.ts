import * as mechActions from '../actions/mechs.actions';
import { MechData, MechsState } from '../../models';

const initialState: MechsState = {
  loading: false,
  loaded: false,
  data: [],
  error: null
};

export function reducer(state: MechsState = initialState, action: mechActions.MechAction) {
  switch (action.type) {
    case mechActions.LOAD_MECHS: {
      return { ...state, loading: true };
    }

    case mechActions.LOAD_MECHS_SUCCESS: {
      return { ...state, data: action.payload, loading: false, loaded: true };
    }

    case mechActions.LOAD_MECHS_FAIL: {
      return { ...state, error: action.payload, loading: false, loaded: false };
    }

    default: {
      return state;
    }
  }
}

export const getMechs = (state: MechsState) => state;
