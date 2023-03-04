import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatePage } from './certificate.page';

describe('CertificatePage', () => {
  let component: CertificatePage;
  let fixture: ComponentFixture<CertificatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
