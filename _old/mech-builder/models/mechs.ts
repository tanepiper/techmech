interface MechRegionData {
  hardpoints: number[];
  armour: number[];
}

interface MechModelData {
  model: string;
  weightFree: number;
  walkSpeed: number;
  jetsMax: number;
  regions: {
    head: MechRegionData;
    torsoCenter: MechRegionData;
    torsoRight: MechRegionData;
    torsoLeft: MechRegionData;
    armRight: MechRegionData;
    armLeft: MechRegionData;
    legRight: MechRegionData;
    legLeft: MechRegionData;
  };
}

export interface MechData {
  name: string;
  class: string;
  weightMax: number;
  damageMelee: number;
  damageDFA: number;
  initiative: number;
  penaltyToHit: number;
  models: MechModelData[];
}

export interface MechsState {
  loading: boolean;
  loaded: boolean;
  data: MechData[];
  error: Error | null;
}
