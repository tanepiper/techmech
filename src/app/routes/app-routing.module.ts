import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TMLanceManagerComponent } from '../modules/lance-manager/containers/lance-manager/lance-manager.component';
import { TMMechwarriorsComponent } from '../modules/mechwarriors/containers/mechwarriors/mechwarriors.component';
import { TMSettingsContainerComponent } from '../modules/settings/containers/settings-container/settings-container.component';


const routes: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  { path: 'settings', component: TMSettingsContainerComponent },
  { path: 'lance-manager', component: TMLanceManagerComponent },
  { path: 'mechwarriors', component: TMMechwarriorsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
