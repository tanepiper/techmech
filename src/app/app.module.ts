import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './routes/app-routing.module';

// Containers
import { AppComponent } from './app.component';
import { AppContainerComponent } from './containers/app-container/app-container.component';
// Components
import { SidebarComponent } from './components/sidebar/sidebar.component';
// Services
import { AppService } from './services/app.service';
// Reducers
import { reducers, effects } from './store';
// Guards
import { AppGuard } from './guards/app.guard';

const HEX_DISTANCE = 24; // Distance in meters is 24m per hex

@NgModule({
  declarations: [AppComponent, AppContainerComponent, SidebarComponent], // , MechChassisComponent, SidebarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effects),
    StoreDevtoolsModule.instrument(),
    AppRoutingModule
  ],
  providers: [AppService, AppGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
