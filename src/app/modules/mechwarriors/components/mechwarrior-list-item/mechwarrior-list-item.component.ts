import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Mechwarrior, SkillLevels } from '../../models/mechwarriors';

@Component({
  selector: 'tm-mechwarrior-list-item',
  styleUrls: ['mechwarrior-list-item.component.scss'],
  templateUrl: './mechwarrior-list-item.component.html'
})
export class TMMechwarriorListItemComponent implements OnInit {
  @Input() mechwarrior: Mechwarrior;

  @Input() skills: any;

  @Output() updateMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  @Output() deleteMechwarrior: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  editing = false;

  constructor() {}

  ngOnInit() {
    if (!this.mechwarrior.name) {
      this.editing = true;
    }
  }

  onUpdateSkill({ skill, value }) {
    const mechwarrior = Object.assign({}, this.mechwarrior);
    if (mechwarrior.stats[skill]) {
      mechwarrior.stats[skill] = value;
    }
    this.updateMechwarrior.emit(this.mechwarrior);
  }

  onEdit() {
    this.editing = !this.editing;
  }

  onSave(mechwarrior) {
    console.log(this.mechwarrior, mechwarrior);
    this.mechwarrior = mechwarrior;
    this.updateMechwarrior.emit(mechwarrior);
  }

  onDeleteMechwarrior(event) {
    event.preventDefault();
    // const confirm = window.confirm(`Are you sure you want to delete ${this.mechwarrior.name}?`);
    const confirm = true;
    if (confirm) {
      this.deleteMechwarrior.emit(this.mechwarrior);
    }
  }
}
