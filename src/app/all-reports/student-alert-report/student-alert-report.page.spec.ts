import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAlertReportPage } from './student-alert-report.page';

describe('StudentAlertReportPage', () => {
  let component: StudentAlertReportPage;
  let fixture: ComponentFixture<StudentAlertReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAlertReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAlertReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
