import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCertificatePage } from './custom-certificate.page';

describe('CustomCertificatePage', () => {
  let component: CustomCertificatePage;
  let fixture: ComponentFixture<CustomCertificatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomCertificatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomCertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
