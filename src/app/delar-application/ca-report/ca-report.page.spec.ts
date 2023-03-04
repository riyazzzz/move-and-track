import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaReportPage } from './ca-report.page';

describe('CaReportPage', () => {
  let component: CaReportPage;
  let fixture: ComponentFixture<CaReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
