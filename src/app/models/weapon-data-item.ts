export interface WeaponData {
  name: string;
  type: string;
  weight: number;
  slots: number;
  cost: number;
  shots: number;
  damage: number;
  stability: number;
  heat: number;
  range: {
    description: string;
    values: number[]
  };
  roundsPerTon: number;
  costPerTon: number;
  notes: string;
}
