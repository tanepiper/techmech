import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MechBuilderComponent } from '../containers/mech-builder/mech-builder.component';
import { MechBuilderGuard } from '../guards/mech-builder.guard';


const routes: Routes = [
  {
    path: 'mech-builder',
    canActivate: [MechBuilderGuard],
    children: [{ path: '', component: MechBuilderComponent }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MechBuilderRoutingModule {}
