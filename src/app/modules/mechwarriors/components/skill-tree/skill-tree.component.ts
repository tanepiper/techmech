import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SkillLevels, Mechwarrior } from '../../models/mechwarriors';

const SKILL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TMSkillTreeComponent),
  multi: true
};

@Component({
  selector: 'tm-skill-tree',
  providers: [SKILL_VALUE_ACCESSOR],
  styleUrls: ['skill-tree.component.scss'],
  template: `
    <div class="skill-tree">
      <h4>{{skill.name}}</h4>
      <h3>Skills Total XP: {{skillXPTotal(skill)}} / 28,400</h3>
      <div class="row card-body">
        <ul class="list-inline mb-0 mt-2">
          <li *ngFor="let level of skill.levels | keysOf; let i = index" class="skill list-inline-item"
            [ngbTooltip]="tipContent" container=".skill-tree" [ngClass]="{'active': isActive(i, level)}"
            (click)="onClick(i)"
            >
            <ng-template #tipContent>
              <div class="card">
                <div class="card-header">
                  <strong class="card-title">{{level}}</strong>
                </div>
                <div class="card-body">
                  <p><strong>Required XP:</strong> {{skill.levels[level].XP}}</p>
                  <p><strong>Bonus:</strong> {{skill.levels[level].bonus}}</p>
                  <p><strong>Skills</strong>
                  <p *ngFor="let skill of skill.levels[level].skills">{{skill.name}}: {{skill.description}}</p>
                </div>
              </div>
            </ng-template>
            <a>{{level}} <i class="fa fa-square"></i></a>
          </li>
      </ul>
      </div>
    </div>
  `
})
export class TMSkillTreeComponent implements ControlValueAccessor {
  @Input() skill: any;
  @Input() mechwarrior: Mechwarrior;
  @Input() editMode: boolean;

  value: number;

  private onTouch: Function;
  private onModelChange: Function;

  constructor() {}

  writeValue(value) {
    this.value = value || 0;
  }

  registerOnChange(fn) {
    this.onModelChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  onClick(index) {
    if (this.editMode) {
      const skill = this.skill.name.toLowerCase();
      this.value = index + 1;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

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
    const val =
      skill && skill.name
        ? this.mechwarrior.stats[skill.name.toLowerCase()]
        : 0;
    const xp = (
      Object.keys((skill && skill.levels) || []).slice(0, val) || []
    ).reduce((previous: number, next: any) => {
      const result = previous + skill.levels[next].XP;
      return result;
    }, 0);
    return xp;
  }
}
