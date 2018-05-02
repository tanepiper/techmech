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
  template: `
  <form novalidate class="form" [formGroup]="mechwarriorForm" (ngSubmit)="onSaveChanges($event)">
  <div class="form-group">
    <label class="form-label">Mechwarrior Name</label>
    <input type="text" class="form-control" placeholder="Mechwarrior Name" formControlName="name" />
  </div>
  <div class="form-group">
    <label class="form-label">Mechwarrior Description</label>
    <textarea class="form-control" placeholder="Mechwarrior Description" formControlName="description"></textarea>
  </div>
  <div class="form-group">
    <label class="form-label">Mechwarrior Type</label>
    <select class="form-control" formControlName="type">
      <option *ngFor="let player of playerTypes" [value]="player.label">{{player.label}}</option>
    </select>
  </div>
  <div formGroupName="stats">
    <div class="form-group">
      <tm-skill-tree [editMode]="true" [skill]="skills.gunnery" [mechwarrior]="mechwarrior" formControlName="gunnery"></tm-skill-tree>
    </div>
    <div class="form-group">
      <tm-skill-tree [editMode]="true" [skill]="skills.piloting" [mechwarrior]="mechwarrior" formControlName="piloting"></tm-skill-tree>
    </div>
    <div class="form-group">
      <tm-skill-tree [editMode]="true" [skill]="skills.guts"
        [mechwarrior]="mechwarrior" formControlName="guts"></tm-skill-tree>
    </div>
    <div class="form-group">
      <tm-skill-tree [editMode]="true" [skill]="skills.tactics"
        [mechwarrior]="mechwarrior" formControlName="tactics"></tm-skill-tree>
    </div>
  </div>
  <div formGroupName="skills">
    <div class="form-group">
      <label class="form-label">First</label>
      <select class="form-control" formControlName="first">
        <option value="">Select First Skill</option>
        <option *ngFor="let skill of primarySkills" [value]="skill">{{skill}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Second</label>
      <select class="form-control" formControlName="second">
      <option value="">Select Second Skill</option>
        <option *ngFor="let skill of primarySkills" [value]="skill">{{skill}}</option>
      </select>
    </div>
    <div class="form-group">
      <label class="form-label">Third</label>
      <select class="form-control" formControlName="third">
       <option value="">Select Third Skill</option>
        <option *ngFor="let skill of secondarySkills" [value]="skill">{{skill}}</option>
      </select>
    </div>
  </div>
  <button type="submit" class="btn btn-default">Save Changes</button>
</form>
  `
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
