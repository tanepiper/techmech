import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { MechData } from '../models';

@Injectable()
export class AppService {
  constructor(private http: HttpClient) {}

  getMechList(): Observable<MechData[]> {
    return this.http.get<MechData[]>('/assets/mech-chassis.json');
  }
}
