import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeofenceListModelPage } from './geofence-list-model.page';

describe('GeofenceListModelPage', () => {
  let component: GeofenceListModelPage;
  let fixture: ComponentFixture<GeofenceListModelPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeofenceListModelPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeofenceListModelPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
