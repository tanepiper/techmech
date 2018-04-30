import { Component } from '@angular/core';

@Component({
  selector: 'app-container',
  templateUrl: './app-container.component.html',
  styleUrls: ['app-container.component.scss']
})
export class AppContainerComponent {
  selectedMech: any;

  constructor() {}

  setSelectedMech(mechId) {
    this.selectedMech = mechId;
  }

  onClick(node) {
    console.log('OnClick', node.data);
  }

  onDblClick(node) {
    console.log('OnDblClick', node.data);
    this.selectedMech = node.data;
  }
}
