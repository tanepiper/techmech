import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContainerComponent } from '../containers/app-container/app-container.component';
import { AppGuard } from '../guards/app.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AppGuard],
    component: AppContainerComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
