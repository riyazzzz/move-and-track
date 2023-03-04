import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SensoriseListComponent } from './sensorise-list.component';

describe('SensoriseListComponent', () => {
  let component: SensoriseListComponent;
  let fixture: ComponentFixture<SensoriseListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SensoriseListComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SensoriseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
