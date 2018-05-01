import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
// Containers
import { MechBuilderComponent } from './containers/mech-builder/mech-builder.component';
// // Guards
import { MechBuilderGuard } from './guards/mech-builder.guard';
// Pipes
import { KeysOfPipe } from './pipes/keys.pipe';
// // Routes
import { MechBuilderRoutingModule } from './routes/mech-builder-routing.module';
// Services
import { AppService } from './services/app.service';
// Reducers
import { effects, reducers } from './store';

@NgModule({
  imports: [CommonModule, StoreModule.forFeature('mechBuilder', reducers), EffectsModule.forFeature(effects), MechBuilderRoutingModule],
  declarations: [MechBuilderComponent, KeysOfPipe],
  exports: [MechBuilderComponent],
  providers: [MechBuilderGuard, AppService]
})
export class MechBuilderModule {}

