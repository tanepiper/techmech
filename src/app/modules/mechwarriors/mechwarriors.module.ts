import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
// Components
import { TmMechwarriorsHeaderComponent } from './components/header/header.component';
import { TMMechwarriorFormComponent } from './components/mechwarrior-form/mechwarrior-form.component';
import { TMMechwarriorListItemComponent } from './components/mechwarrior-list-item/mechwarrior-list-item.component';
import { TMSkillTreeComponent } from './components/skill-tree/skill-tree.component';
// Containers
import { TMMechwarriorsComponent } from './containers/mechwarriors/mechwarriors.component';
// Services
import { MechwarriorsService } from './services/mechwarriors.service';
import { TMSkillsService } from './services/skills.service';
import * as MechwarriorsStore from './store';

// Pipes
import { KeysOfPipe } from './pipes/keys.pipe';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
    StoreModule.forFeature('mechwarriors', MechwarriorsStore.reducers),
    EffectsModule.forFeature(MechwarriorsStore.effects)
  ],
  declarations: [
    TMMechwarriorsComponent,
    TmMechwarriorsHeaderComponent,
    TMMechwarriorListItemComponent,
    TMMechwarriorFormComponent,
    TMSkillTreeComponent,
    KeysOfPipe
  ],
  providers: [MechwarriorsService, TMSkillsService]
})
export class TmMechwarriorsModule {}
