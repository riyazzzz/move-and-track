import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceExtendOneyearRequestDetailsPage } from './device-extend-oneyear-request-details.page';

describe('DeviceExtendOneyearRequestDetailsPage', () => {
  let component: DeviceExtendOneyearRequestDetailsPage;
  let fixture: ComponentFixture<DeviceExtendOneyearRequestDetailsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceExtendOneyearRequestDetailsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceExtendOneyearRequestDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
