import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Skill, SkillLevels } from '../models/mechwarriors';

@Injectable()
export class TMSkillsService {
  constructor(private http: HttpClient) {}

  getSkills(): Observable<SkillLevels> {
    return this.http.get<SkillLevels>('/assets/mechwarrior-skills.json');
  }
}
