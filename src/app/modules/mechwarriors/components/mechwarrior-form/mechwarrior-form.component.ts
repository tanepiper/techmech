import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Mechwarrior } from '../../models/mechwarriors';

@Component({
  selector: 'tm-mechwarrior-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['mechwarrior-form.component.scss'],
  templateUrl: './mechwarrior-form.component.html'
})
export class TMMechwarriorFormComponent implements OnInit {
  @Input() mechwarrior: Mechwarrior;

  @Input() skills: any;

  @Output() save: EventEmitter<Mechwarrior> = new EventEmitter<Mechwarrior>();

  mechwarriorForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  firstLevelSkillsDisabled = false;

  secondLevelSkillsDisabled = false;

  get primary() {
    const skillKeys = Object.keys(this.skills);
    const skills = skillKeys.map(skill => {
      return this.skills[skill].skills.find(s => s.type === 'primary');
    });
    return skills;
  }

  get secondary() {
    const skillKeys = Object.keys(this.skills);
    const skills = skillKeys.map(skill => {
      return this.skills[skill].skills.find(s => s.type === 'secondary');
    });
    return skills;
  }

  ngOnInit() {
    this.mechwarriorForm = this.fb.group({
      id: this.mechwarrior.id,
      name: this.mechwarrior.name,
      description: this.mechwarrior.description,
      type: this.mechwarrior.type,
      stats: this.fb.group({
        gunnery: this.mechwarrior.stats.gunnery,
        piloting: this.mechwarrior.stats.piloting,
        guts: this.mechwarrior.stats.guts,
        tactics: this.mechwarrior.stats.tactics
      }),
      skills: this.fb.group({
        first: [{ value: (this.mechwarrior.skills && this.mechwarrior.skills.first || ''), disabled: this.firstLevelSkillsDisabled }],
        second: [{ value: (this.mechwarrior.skills && this.mechwarrior.skills.second || ''), disabled: this.firstLevelSkillsDisabled }],
        third: [{ value: (this.mechwarrior.skills && this.mechwarrior.skills.third || ''), disabled: this.secondLevelSkillsDisabled }],
      })
    });
  }

  onSaveChanges(event) {
    event.preventDefault();
    this.save.emit(this.mechwarriorForm.value);
  }
}
