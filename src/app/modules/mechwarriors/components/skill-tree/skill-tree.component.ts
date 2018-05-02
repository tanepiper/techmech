import { Component, Input } from '@angular/core';
import { SkillLevels, Mechwarrior } from '../../models/mechwarriors';

@Component({
  selector: 'tm-skill-tree',
  styleUrls: ['skill-tree.component.scss'],
  template: `
    <div class="skill-tree">
      <h4>{{skill.name}}</h4>
      <h3>Skills Total XP: {{skillXPTotal(skill)}} / 28,400</h3>
      <div class="row card-body">
        <ul class="list-inline mb-0 mt-2">
          <li *ngFor="let level of skill.levels | keysOf; let i = index" class="skill list-inline-item"
            [ngbTooltip]="tipContent" [ngClass]="{'active': isActive(i, level)}">
            <ng-template #tipContent>
              <strong>{{level}}</strong>
              <p>Required XP: {{skill.levels[level].XP}}</p>
              <p>Bonus: {{skill.levels[level].bonus}}</p>
              <ul><li *ngFor="let skill of skill.levels[level].skills">{{skill.name}}: {{skill.description}}</li></ul>
            </ng-template>
            <a>{{level}} <i class="fa fa-square"></i></a>
          </li>
      </ul>
      </div>
    </div>
  `
})
export class TMSkillTreeComponent {
  @Input() skill: any;

  @Input() mechwarrior: Mechwarrior;

  constructor() {}

  isActive(index, level) {
    const val = this.mechwarrior.stats[this.skill.name.toLowerCase()];
    if (index <= Math.ceil(val)) {
      const check = val - index;
      if (check >= 1) {
        return true;
      }
    }
    return false;
  }

  skillXPTotal(skill) {
    const val = skill && skill.name ? this.mechwarrior.stats[skill.name.toLowerCase()] : 0;
    const xp = (Object.keys(skill && skill.levels || []).slice(0, val) || []).reduce((previous: number, next: any) => {
      const result = previous + skill.levels[next].XP;
      return result;
    }, 0);
    return xp;
  }
}
