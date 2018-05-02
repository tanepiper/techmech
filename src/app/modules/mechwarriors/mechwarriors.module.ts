import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { TMMechwarriorsComponent } from './containers/mechwarriors/mechwarriors.component';

// Components
import { TmMechwarriorsHeaderComponent } from './components/header/header.component';
import { TMMechwarriorListItemComponent } from './components/mechwarrior-list-item/mechwarrior-list-item.component';
import { TMMechwarriorFormComponent } from './components/mechwarrior-form/mechwarrior-form.component';

// Services
import { MechwarriorsService } from './services/mechwarriors.service';

import * as MechwarriorsStore from './store';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, StoreModule.forFeature('mechwarriors', MechwarriorsStore.reducers)],
  declarations: [
    TMMechwarriorsComponent,
    TmMechwarriorsHeaderComponent,
    TMMechwarriorListItemComponent,
    TMMechwarriorFormComponent
  ],
  providers: [MechwarriorsService]
})
export class TmMechwarriorsModule {}
