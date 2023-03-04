import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesReportPage } from './sales-report.page';

describe('SalesReportPage', () => {
  let component: SalesReportPage;
  let fixture: ComponentFixture<SalesReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
