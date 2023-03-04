import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimDeviceRenewalRequestPage } from './esim-device-renewal-request.page';

describe('EsimDeviceRenewalRequestPage', () => {
  let component: EsimDeviceRenewalRequestPage;
  let fixture: ComponentFixture<EsimDeviceRenewalRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimDeviceRenewalRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimDeviceRenewalRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
