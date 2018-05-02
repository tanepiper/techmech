export interface Mechwarrior {
  id?: number;
  name: string;
  description: string;
  stats: {
    gunnery: number;
    pilot: number;
    guts: number;
    tactics: number;
  };
}
