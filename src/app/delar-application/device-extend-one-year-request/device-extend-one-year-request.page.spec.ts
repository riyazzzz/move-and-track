import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceExtendOneYearRequestPage } from './device-extend-one-year-request.page';

describe('DeviceExtendOneYearRequestPage', () => {
  let component: DeviceExtendOneYearRequestPage;
  let fixture: ComponentFixture<DeviceExtendOneYearRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceExtendOneYearRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceExtendOneYearRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
