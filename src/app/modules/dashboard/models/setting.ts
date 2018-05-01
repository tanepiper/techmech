export interface Setting {
  key: string;
  value: any;
}

export interface SettingsGroup {
  key: string;
  settings: Setting[];
}
