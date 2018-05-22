import { Component, Input, Output, EventEmitter, forwardRef, ChangeDetectionStrategy } from '@angular/core';
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
        <div class="container">
          <div class="row">
            <div class="col-8">
              <div class="btn-group flex-wrap" role="group">
                <button *ngFor="let level of skill.levels | keysOf; let i = index" class="skill btn"
                [ngClass]="{'btn-info': isActive(i, level), 'btn-default': !isActive(i, level)}"
                (click)="onClick($event, i)">{{level}}</button>
              </div>
            </div>
            <div class="col-4">
              <div class="card">
                <div class="card-header">
                  <strong class="card-title">Level {{value}}</strong>
                </div>
                <div class="card-body">
                  <p><strong>Required XP:</strong> {{levelInfo(value).XP}}</p>
                  <p><strong>Bonus:</strong> {{levelInfo(value).bonus}}</p>
                  <p *ngFor="let skill of levelInfo(value).skills"><strong>{{skill.name}}:</strong> {{skill.description}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class TMSkillTreeComponent implements ControlValueAccessor {
  @Input() skill: any;
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

  levelInfo(level) {
    return (this.skill.levels && Object.keys(this.skill.levels).length > 0) && this.skill.levels[`Level ${level}`] || {};
  }

  skillXPTotal(skill) {
    return (Object.keys((skill && skill.levels) || []).slice(0, this.value) || []).reduce(
      (previous: number, next: any) => {
        const result = previous + skill.levels[next].XP;
        return result;
      },
      0
    );
  }
}
