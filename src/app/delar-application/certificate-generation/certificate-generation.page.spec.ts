import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateGenerationPage } from './certificate-generation.page';

describe('CertificateGenerationPage', () => {
  let component: CertificateGenerationPage;
  let fixture: ComponentFixture<CertificateGenerationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificateGenerationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateGenerationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
