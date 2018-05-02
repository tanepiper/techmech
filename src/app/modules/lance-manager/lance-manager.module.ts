import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';

// Containers
import { TMLanceManagerComponent } from './containers/lance-manager/lance-manager.component';

// Components
import { TmLanceManagerHeaderComponent } from './components/header/header.component';
import { TMLanceListItemComponent } from './components/lance-list-item/lance-list-item.component';
import { TMLanceFormComponent } from './components/lance-form/lance-form.component';

// Services
import { LanceManagerService } from './services/lance-manager.service';

import * as lanceManagerStore from './store';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, StoreModule.forFeature('lances', lanceManagerStore.reducers)],
  declarations: [
    TMLanceManagerComponent,
    TmLanceManagerHeaderComponent,
    TMLanceListItemComponent,
    TMLanceFormComponent
  ],
  providers: [LanceManagerService]
})
export class TmLanceManagerModule {}
