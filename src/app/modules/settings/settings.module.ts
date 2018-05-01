import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Containers
import { TMSettingsContainerComponent } from './containers/settings-container/settings-container.component';

// Services
import { SettingsService } from './services/settings.service';

@NgModule({
  imports: [CommonModule],
  declarations: [TMSettingsContainerComponent],
  providers: [SettingsService]
})
export class TMSettingsModule {}
