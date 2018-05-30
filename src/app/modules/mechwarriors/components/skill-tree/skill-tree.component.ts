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
  templateUrl: './skill-tree.component.html'
})
export class TMSkillTreeComponent implements ControlValueAccessor {
  @Input() skill: any;
  @Input() editMode: boolean;
  @Input() value: number;

  private onTouch: Function;
  private onModelChange: Function;

  protected XP_LEVELS = [0, 0, 400, 900, 1600, 2500, 3600, 4900, 6400, 8100];
  protected MAX_SKILL_XP = 28400;

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

  get list() {
    // debugger;
    return ((this.skill || {}).skills || []).sort((skillA: any, skillB: any) => {
      if (
        (skillA.type === 'core' && skillB.type === 'primary') ||
        (skillA.type === 'core' && skillB.type === 'secondary') ||
        (skillA.type === 'primary' && skillB.type === 'secondary')
      ) {
        return -1;
      }
      if (skillA.type === 'core' && skillB.type === 'core') {
        return 0;
      }
      if (
        (skillA.type === 'primary' && skillB.type === 'core') ||
        (skillA.type === 'secondary' && skillB.type === 'core') ||
        (skillA.type === 'secondary' && skillB.type === 'primary')
      ) {
        return 1;
      }
    });
  }

  levelInfo(level) {
    return (
      (this.skill.levels && Object.keys(this.skill.levels).length > 0 && this.skill.levels[`Level ${level}`]) || {}
    );
  }

  skillXPTotal(skill) {
    const foo = this.XP_LEVELS.slice(0, this.value).reduce((previous: number, next: any) => {
      const result = previous + next;
      return result;
    }, 0);
    return foo;
  }
}
