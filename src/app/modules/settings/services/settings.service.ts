import { Injectable } from '@angular/core';
import { LocalStorage } from 'ngx-store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Setting, SettingsGroup } from '../models/setting';

@Injectable()
export class SettingsService {
  @LocalStorage() settingsInterface: SettingsGroup;

  constructor() {}

  addSetting({ key, value }): void {
    this.settingsInterface.settings.push({ key, value });
  }

  updateSetting({ key, value }): void {
    this.settingsInterface.settings = this.settingsInterface.settings.map(setting => {
      if (setting.key === key) {
        setting.value = value;
      }
      return setting;
    });
  }

  deleteSetting({key}): void {
    this.settingsInterface.settings = this.settingsInterface.settings.filter(setting => setting.key !== key);
  }

  getSettings(): Observable<SettingsGroup> {
    return of(this.settingsInterface);
  }
}
