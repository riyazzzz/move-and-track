import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimCaReportPage } from './esim-ca-report.page';

describe('EsimCaReportPage', () => {
  let component: EsimCaReportPage;
  let fixture: ComponentFixture<EsimCaReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimCaReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimCaReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
