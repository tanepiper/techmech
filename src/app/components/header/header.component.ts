import { Component } from '@angular/core';

@Component({
  selector: 'tm-header',
  styleUrls: ['header.component.scss'],
  template: `
  <header class="header py-4">
    <div class="container">
      <div class="d-flex">
        <a routeLink="/"><h1>TechMech</h1></a>
      </div>
    </div>
  </header>
  `
})
export class HeaderComponent {
  constructor() {}
}
