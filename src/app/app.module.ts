import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { WebStorageModule } from 'ngx-store';
// Components
import { HeaderComponent } from './components/header/header.component';
import { MainNavigationComponent } from './components/main-navigation/main-navigation.component';
// Containers
import { AppContainerComponent } from './containers/app-container/app-container.component';
import { TmLanceManagerModule } from './modules/lance-manager/lance-manager.module';
import { TmMechwarriorsModule } from './modules/mechwarriors/mechwarriors.module';
// Modules
import { TMSettingsModule } from './modules/settings/settings.module';
// App Routing
import { AppRoutingModule } from './routes/app-routing.module';



const HEX_DISTANCE = 24; // Distance in meters is 24m per hex

@NgModule({
  declarations: [AppContainerComponent, HeaderComponent, MainNavigationComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument(),
    NgbModule.forRoot(),
    WebStorageModule,
    TMSettingsModule,
    TmLanceManagerModule,
    TmMechwarriorsModule,
    AppRoutingModule
  ],
  bootstrap: [AppContainerComponent]
})
export class AppModule {}
