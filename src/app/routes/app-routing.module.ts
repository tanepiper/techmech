import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TMSettingsContainerComponent } from '../modules/settings/containers/settings-container/settings-container.component';
import { TMLanceManagerComponent } from '../modules/lance-manager/containers/lance-manager/lance-manager.component';

const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: TMSettingsContainerComponent },
  { path: 'lance-manager', component: TMLanceManagerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
