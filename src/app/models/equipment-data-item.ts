export interface EquipmentData {
  name: string;
  weight: number;
  slots: number;
  value: number;
  manufacturer: string;
  model: string;
  modifiers: {
    type: ModifierType;
    area: EquipmentBodyArea;
    property: string;
    value: number;
  };
}

enum ModifierType {
  Mech = 'Mech',
  Weapon = 'Weapon'
}

enum EquipmentBodyArea {
  Head = 'head',
  CenterTorso = 'torsoCenter',
  LeftTorso = 'torsoLeft',
  RightTorso = 'torsoRight',
  LeftArm = 'armLeft',
  RightArm = 'armRight',
  LeftLeg = 'legLeft',
  RightLeg = 'letRight'
}
