import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MechChassisComponent } from './mech-chassis.component';

describe('MechChassisComponent', () => {
  let component: MechChassisComponent;
  let fixture: ComponentFixture<MechChassisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MechChassisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MechChassisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
