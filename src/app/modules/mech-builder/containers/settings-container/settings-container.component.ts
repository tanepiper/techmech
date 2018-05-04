import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { SettingsService } from '../../services/settings.service';
import { SettingsGroup } from '../../models/setting';

@Component({
  selector: 'tm-settings-container',
  styleUrls: ['settings-container.component.scss'],
  template: `
  <div class="page-header"><h2 class="page-title">Techmech Settings</h2></div>
  <div class="row">
    <div class="col">
      <form class="card">
        <div class="card-header">
          <h3 class="card-title">Interface Settings</h3>
        </div>
        <div class="card-body">
          <div class="form-group">
            <label class="form-label">Theme</label>
            <select class="form-control custom-select">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="military">Military</option>
            </select>
          </div>
        </div>
      </form>
    </div>
  </div>
  `
})
export class TMSettingsContainerComponent {
  settings$: Observable<SettingsGroup>;

  constructor(private settingsService: SettingsService) {
    this.settings$ = this.settingsService.getSettings();
  }

  onUpdate(setting) {
    this.settingsService.updateSetting(setting);
  }
}
