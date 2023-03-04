import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceTopupRequestPage } from './device-topup-request.page';

describe('DeviceTopupRequestPage', () => {
  let component: DeviceTopupRequestPage;
  let fixture: ComponentFixture<DeviceTopupRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceTopupRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceTopupRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
