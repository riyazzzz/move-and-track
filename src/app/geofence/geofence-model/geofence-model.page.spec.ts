import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceModelPage } from './geofence-model.page';

describe('GeofenceModelPage', () => {
  let component: GeofenceModelPage;
  let fixture: ComponentFixture<GeofenceModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
