import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

// Containers
import { TMLanceManagerComponent } from './containers/lance-manager/lance-manager.component';

// Components
import { TmLanceManagerHeaderComponent } from './components/header/header.component';
import { TMLanceListItemComponent } from './components/lance-list-item/lance-list-item.component';

// Services
import { LanceManagerService } from './services/lance-manager.service';

import * as lanceManagerStore from './store';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('lances', lanceManagerStore.reducers)],
  declarations: [TMLanceManagerComponent, TmLanceManagerHeaderComponent, TMLanceListItemComponent],
  providers: [LanceManagerService]
})
export class TmLanceManagerModule {}
