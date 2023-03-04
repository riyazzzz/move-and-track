import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceCertificateRequestPage } from './device-certificate-request.page';

describe('DeviceCertificateRequestPage', () => {
  let component: DeviceCertificateRequestPage;
  let fixture: ComponentFixture<DeviceCertificateRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceCertificateRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceCertificateRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
