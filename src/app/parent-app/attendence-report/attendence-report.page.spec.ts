import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceReportPage } from './attendence-report.page';

describe('AttendenceReportPage', () => {
  let component: AttendenceReportPage;
  let fixture: ComponentFixture<AttendenceReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendenceReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendenceReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
