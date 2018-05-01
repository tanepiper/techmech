import { Component } from '@angular/core';

@Component({
  selector: 'tm-main-navigation',
  styleUrls: ['main-navigation.component.scss'],
  template: `
  <nav class="header collapse d-lg-flex p-0" id="headerMenuCollapse">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-lg-3 ml-auto">
        <form class="input-icon my-3 my-lg-0">
          <input type="search" class="form-control header-search"
            placeholder="Search for Mech, Mechwarrior, Lance, Weapon or Equiptment" tabindex="1">
          <div class="input-icon-addon">
            <i class="fe fe-search"></i>
          </div>
        </form>
        </div>
        <div class="col-lg order-lg-first">
          <ul class="nav nav-tabs border-0 flex-column flex-lg-row">
            <li class="nav-item">
              <a routerLink="/" class="nav-link"><i class="fe fe-home"></i>Dashboard</a>
            </li>
            <li class="nav-item">
              <a routerLink="/mech-builder" class="nav-link" data-toggle="dropdown"><i class="fe fe-box"></i> Mech Builder</a>
            </li>
            <li class="nav-item">
              <a routerLink="/mechwarriors" class="nav-link" data-toggle="dropdown"><i class="fe fe-file-text"></i> Mechwarriors</a>
            </li>
            <li class="nav-item">
              <a routerLink="/lance-manager" class="nav-link" data-toggle="dropdown">
                <i class="fe fe-check-square"></i> Lance Manager</a>
            </li>
            <li class="nav-item">
              <a routerLink="/settings" class="nav-link">
                <i class="fe fe-settings"></i> Settings</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
  `
})
export class MainNavigationComponent {
  constructor() {}
}
