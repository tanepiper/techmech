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

  protected playerTypes = [
    { value: 'npc', label: 'Standard NPC' },
    { value: 'ks', label: 'Kickstarter NPC' },
    { value: 'ply', label: 'Player' }
  ];

  protected primarySkills = [
    'Multi-target',
    'Evasive Movement',
    'Bulwark',
    'Sensor Lock'
  ];
  protected secondarySkills = [
    'Breaching Shot',
    'Ace Pilot',
    'Juggernaut',
    'Master Tactician'
  ];

  constructor(private fb: FormBuilder) {}

  firstLevelSkillsDisabled = false;
  secondLevelSkillsDisabled = false;

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

    const query$ = this.mechwarriorForm.valueChanges.subscribe(form => {
      const result = Object.keys(this.mechwarriorForm.value.stats).reduce(
        (prev, next) => {
          if (this.mechwarriorForm.value.stats[next] > prev) {
            return this.mechwarriorForm.value.stats[next];
          }
          return prev;
        },
        0
      );
      // this.mechwarriorForm.controls.skills['first'].disable();
      // this.mechwarriorForm.controls.skills['second'].disable();
      // this.mechwarriorForm.controls.skills['third'].disable();
      this.firstLevelSkillsDisabled = true;
      this.secondLevelSkillsDisabled = true;
      if (result >= 5) {
        // this.mechwarriorForm.controls.skills['first'].enable();
        // this.mechwarriorForm.controls.skills['second'].enable();
        this.firstLevelSkillsDisabled = false;
      }
      if (result >= 8) {
        // this.mechwarriorForm.controls.skills['third'].enable();
        this.secondLevelSkillsDisabled = false;
      }
    }); // , error => console.log(error), () => query$.unsubsribe());
  }

  onSaveChanges(event) {
    event.preventDefault();
    this.save.emit(this.mechwarriorForm.value);
  }
}
