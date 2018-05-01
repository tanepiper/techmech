import { Component } from '@angular/core';

@Component({
  selector: 'tm-root',
  template: `
  <div class="page">
    <div class="page-main">
      <tm-header></tm-header>
      <tm-main-navigation></tm-main-navigation>

      <section class="my-3 my-md-5">
      <div class="container">
        <router-outlet></router-outlet>
      </div>
      </section>
    </div>
  </div>
  `
})
export class AppContainerComponent {}
