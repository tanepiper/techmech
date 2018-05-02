import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef,
  ChangeDetectionStrategy
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
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SKILL_VALUE_ACCESSOR],
  styleUrls: ['skill-tree.component.scss'],
  template: `
    <div class="card">
      <div class="card-header">
        <h3 class="card-title">{{skill.name}}</h3>
        <div class="card-options">
        Skills Total XP: {{skillXPTotal(skill)}} / 28,400
        </div>
      </div>
      <div class="card-body">
        <div class="btn-group" role="group">
          <button *ngFor="let level of skill.levels | keysOf; let i = index" class="skill btn btn-default" [ngbTooltip]="tipContent"
            container=".skill-tree" [ngClass]="{'btn-info': isActive(i, level)}" (click)="onClick($event, i)">{{level}}
            <ng-template #tipContent>
              <div class="card">
                <div class="card-header">
                  <strong class="card-title">{{level}}</strong>
                </div>
                <div class="card-body">
                  <p><strong>Required XP:</strong> {{skill.levels[level].XP}}</p>
                  <p><strong>Bonus:</strong> {{skill.levels[level].bonus}}</p>
                  <p *ngFor="let skill of skill.levels[level].skills"><strong>{{skill.name}}:</strong> {{skill.description}}</p>
                </div>
              </div>
            </ng-template>
          </button>
        </div>
      </div>
    </div>
  `
})
export class TMSkillTreeComponent implements ControlValueAccessor {
  @Input() skill: any;
  @Input() mechwarrior: Mechwarrior;
  @Input() editMode: boolean;

  @Input() value: number;

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

  onClick(event, index) {
    event.preventDefault();
    if (this.editMode) {
      const skill = this.skill.name.toLowerCase();
      this.value = index + 1;
      this.onModelChange(this.value);
    }
    return this.onTouch && this.onTouch();
  }

  isActive(index, level) {
    if (index <= Math.ceil(this.value)) {
      const check = this.value - index;
      if (check >= 1) {
        return true;
      }
    }
    return false;
  }

  skillXPTotal(skill) {
    console.log(skill);
    return (
      Object.keys((skill && skill.levels) || []).slice(0, this.value) || []
    ).reduce((previous: number, next: any) => {
      const result = previous + skill.levels[next].XP;
      return result;
    }, 0);
  }
}
